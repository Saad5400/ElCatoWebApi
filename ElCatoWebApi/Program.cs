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
    // To be used later on throught the program by other classes
    public static bool IsDevelopment { get; private set; } = false;
    public static readonly string FixedPolicy = "fixed";

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // MVC
        builder.Services.AddControllersWithViews().AddNewtonsoftJson(options => options
            .SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        );

        // Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Databases
        builder.Services.AddDbContext<AppDbContext>(options => options
            .UseLazyLoadingProxies()
            .UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddDbContext<OldDbContext>(options => options
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
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuers = builder.Configuration.GetSection("JWT:Issuers").Get<string[]>(),
                ValidAudiences = builder.Configuration.GetSection("JWT:Audiences").Get<string[]>(),
                IssuerSigningKey = new SymmetricSecurityKey(Key)
            };
        });
        builder.Services.AddAuthorization();
        builder.Services.AddScoped<JwtManager, JwtManager>();

        // Rate limiter
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

        // CORS
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        // Caching
        builder.Services.AddOutputCache(options =>
        {
            options.AddBasePolicy(builder =>
            {
                builder.Expire(TimeSpan.FromMinutes(60));
            });
        });
        builder.Services.AddResponseCaching();

        /* -- -- -- -- -- -- -- -- -- -- -- -- -- */
        
        var app = builder.Build();

        // Swagger
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            IsDevelopment = true;
        }
        app.UseCors();

        app.UseHttpsRedirection();
        app.UseStaticFiles(new StaticFileOptions()
        {
            HttpsCompression = Microsoft.AspNetCore.Http.Features.HttpsCompressionMode.Compress,
            OnPrepareResponse = ctx =>
            {
                // // utf 8 encoding
                var headers = ctx.Context.Response.Headers;
                var contentType = headers["Content-Type"];
                contentType += "; charset=utf-8";
                headers["Content-Type"] = contentType;
                // Cache
                ctx.Context.Response.Headers.Append("Cache-Control", $"public,max-age={1 * 60 * 60 * 24 * 30 * 12}");
                ctx.Context.Response.Headers.Append("Expires", DateTime.UtcNow.AddYears(1).ToString("R", CultureInfo.InvariantCulture));
            }
        });
        app.UseRouting();

        app.UseResponseCaching();
        app.UseOutputCache();

        app.UseRateLimiter();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapGet("sitemap-xml", () =>
            Results.File("sitemap.xml", "application/xml")
        );
        app.MapGet("sitemap-text", () => 
            Results.File("sitemap.txt", "text/plain")
        );
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
            SitemapUpdater.UpdateSiteMap(db).GetAwaiter().GetResult();
        }

        app.Run();
    }
}
