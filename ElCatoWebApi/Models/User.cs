using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models;

public class User
{
    public int Id { get; set; }
    [Required]
    public string Username { get; set; } = null!;
    [Required]
    public string Password { get; set; } = null!;
}

