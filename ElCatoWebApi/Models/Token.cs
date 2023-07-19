using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElCatoWebApi.Models;

public class Token
{
    public string Value { get; set; } = null!;
}
