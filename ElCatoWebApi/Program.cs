using ElCatoWebApi.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ElCatoWebApi.Services;

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

        // Respne caching
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
        app.UseStaticFiles();
        app.UseRouting();

        app.UseCors(corsName);
        app.UseResponseCaching();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action}/{id?}");

        // Map static react frontend
        app.MapGet("/", () => Results.Redirect("~/react/index.html"));

        // Auto run migrations
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();
        }

        app.Run();
    }
}
