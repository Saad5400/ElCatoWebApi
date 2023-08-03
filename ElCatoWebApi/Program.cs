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
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        );

        builder.Services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "wwwroot/react";
        });

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

        const string fixedPolicy = "fixed";
        builder.Services.AddRateLimiter(_ => _
            .AddFixedWindowLimiter(policyName: fixedPolicy, options =>
            {
                options.PermitLimit = 10;
                options.Window = TimeSpan.FromSeconds(10);
                options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                options.QueueLimit = 3;
            }));

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

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            IsDevelopment = true;
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseSpaStaticFiles();
        app.UseRouting();

        app.UseCors(corsName);

        app.UseOutputCache();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute
                (
                    name: "default",
                    pattern: "{controller}/{action}/{id?}"
                )
                .RequireRateLimiting(fixedPolicy);

            endpoints.MapFallback
                (
               "/{**slug}",
                   async (context) =>
                   {
                       // render and return the SPA
                       context.Response.ContentType = "text/html";
                       await context.Response.SendFileAsync(Path.Combine(app.Environment.ContentRootPath, "wwwroot/react/index.html"));
                   }
                )
                .RequireRateLimiting(fixedPolicy)
                .CacheOutput();
        });

        // Auto run migrations
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();
        }

        app.Run();
    }
}
