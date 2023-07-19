using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models.OldModels
{
    public class Page
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Folder { get; set; }

        public string Content { get; set; }

        public int ViewCount { get; set; }

        public int IncrementViewCount()
        {
            return ++ViewCount;
        }
    }
}
