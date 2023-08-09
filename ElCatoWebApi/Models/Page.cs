using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models
{
    public class Page
    {
        public static Func<Page, dynamic> MinimalSelector { get; } =
            (Page p) => new { p.Id, p.Title, p.Accepted, p.Order, p.ViewCount, p.FingerPrint, p.CardId, p.CreatedAt };

        public static Func<Page, dynamic> WithCardSelector { get; } =
            (Page p) => new
            {
                p.Id, p.Title, p.Accepted, p.Content, p.Order, p.ViewCount, p.FingerPrint, p.CardId, p.CreatedAt, Card = Card.WithSectionSelector(p.Card)
            };

        [Key]
        public int Id { get; set; }
        [MinLength(4)]
        [MaxLength(50)]
        public string Title { get; set; } = string.Empty;
        [MaxLength(50)]
        public string TitleIcon { get; set; } = string.Empty;
        [MaxLength(50)]
        public string Subtitle { get; set; } = string.Empty;
        [MaxLength(102400)]
        public string Content { get; set; } = string.Empty;
        public int Order { get; set; } = 0;
        public int ViewCount { get; set; } = 0;
        [MaxLength(500)]
        public string? IpAddress { get; set; } = string.Empty;
        [MaxLength(500)]
        public string? FingerPrint { get; set; } = string.Empty;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public bool? Accepted { get; set; } = false;

        public int CardId { get; set; }
        public virtual Card? Card { get; set; } = null!;
    }
}
