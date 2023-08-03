using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models
{
    public class Section
    {

        public static Func<Section?, dynamic> MinimalSelector =>
            s => new { s?.Id, s?.Title, s?.Subtitle, s?.Order };

        public  static Func<Section?, dynamic> WithCardsSelector =>
            s => new { s?.Id, s?.Title, s?.Subtitle, s?.Order, Cards = s?.Cards?.Select(c => Card.MinimalSelector(c)) };

        public static Func<Section?, dynamic> WithCardsAndPagesSelector =>
            s => new { s?.Id, s?.Title, s?.Subtitle, s?.Order, Cards = s?.Cards?.Select(c => Card.WithPagesSelector(c)) };

        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Title { get; set; } = string.Empty;
        [MaxLength(50)]
        public string Subtitle { get; set; } = string.Empty;
        public int Order { get; set; } = 0;

        public virtual ICollection<Card>? Cards { get; set; } = new List<Card>();
    }
}
