using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models.OldModels
{
    public class HomeAlert
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Content { get; set; }

        public string? AlertType { get; set; } = "alert-info";
    }
}
