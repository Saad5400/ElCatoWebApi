using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ElCatoWebApi.Data;
using ElCatoWebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ElCatoWebApi.Services;

public class JwtManager
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _db;

    public JwtManager(IConfiguration configuration, AppDbContext db)
    {
        _configuration = configuration;
        _db = db;
    }

    public async Task<Token?> Authenticate(string username, string password, HttpRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => username == u.Username && password == u.Password);

        if (user == null)
        {
            return null;
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = Encoding.UTF8.GetBytes(_configuration["JWT:Key"]!);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username)
            }),
            Expires = DateTime.UtcNow.AddYears(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature),
            Issuer = request.Host.Value,
            Audience = request.Host.Value,
        };
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = new Token
        {
            Value = tokenHandler.WriteToken(securityToken),
        };

        return token;
    }
}

