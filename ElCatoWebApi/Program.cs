using System.Globalization;
using ElCatoWebApi.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.RateLimiting;
using ElCatoWebApi.Services;
using Microsoft.AspNetCore.RateLimiting;

namespace ElCatoWebApi;

public class Program
{
    public static bool IsDevelopment { get; private set; } = false;
    public static readonly string FixedPolicy = "fixed";
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        );

        // builder.Services.AddSpaStaticFiles(configuration =>
        // {
        //     configuration.RootPath = "wwwroot/react";
        // });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // SQLite database
        builder.Services.AddDbContext<AppDbContext>(options => options
            .UseLazyLoadingProxies()
            .UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddDbContext<OldDbContext>(options =>
                options
                    .UseSqlite(builder.Configuration.GetConnectionString("OldConnection"))
        //.UseModel(OldDbContext.Instance)
        );

        // JWT Authentication
        builder.Services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            var Key = Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]!);
            o.SaveToken = true;
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,     // Change to true in production
                ValidateAudience = false,   // Change to true in production
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["JWT:Issuer"],
                ValidAudience = builder.Configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Key)
            };
        });

        builder.Services.AddRateLimiter(limiterOptions =>
        {
            limiterOptions
                .AddSlidingWindowLimiter(policyName: FixedPolicy, options =>
                {
                    options.PermitLimit = 25;
                    options.Window = TimeSpan.FromSeconds(30);
                    options.SegmentsPerWindow = 10;

                    options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                    options.QueueLimit = 2;
                });
            limiterOptions.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
        });

        builder.Services.AddAuthorization();

        builder.Services.AddScoped<JwtManager, JwtManager>();

        // CORS
        const string corsName = "_myAllowedSpecificOrigins";
        var allowed = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(corsName, builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        builder.Services.AddOutputCache(options =>
        {
            options.AddBasePolicy(builder =>
            {
                builder.Expire(TimeSpan.FromMinutes(60));
            });
        });

        builder.Services.AddResponseCaching();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            IsDevelopment = true;
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles(new StaticFileOptions()
        {
            HttpsCompression = Microsoft.AspNetCore.Http.Features.HttpsCompressionMode.Compress,
            OnPrepareResponse = ctx =>
            {
                ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=604800");
                ctx.Context.Response.Headers.Append("Expires", DateTime.UtcNow.AddDays(7).ToString("R", CultureInfo.InvariantCulture));
            }
        });
        // app.UseSpaStaticFiles();
        app.UseRouting();
        app.UseCors(corsName);
        app.UseResponseCaching();
        app.UseOutputCache();
        app.UseRateLimiter();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllerRoute
            (
                name: "default",
                pattern: "{controller=Frontend}/{action=Index}/{id?}"
            )
            .RequireRateLimiting(FixedPolicy);

        // Auto run migrations
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();
        }

        app.Run();
    }
}
