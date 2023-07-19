using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models
{
    public class Page
    {
        public static Func<Page, dynamic> MinimalSelector { get; } =
            (Page p) => new { p.Id, p.Title, p.TitleIcon, p.Subtitle, p.Order, p.ViewCount, p.SectionId, p.CardId };

        public static Func<Page, dynamic> WithSectionAndCardSelector { get; } =
            (Page p) => new
            {
                p.Id, p.Title, p.TitleIcon, p.Subtitle, p.Content, p.Order, p.ViewCount, p.SectionId, p.CardId,
                Section = Section.MinimalSelector(p.Section), Card = Card.MinimalSelector(p.Card)
            };

        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string TitleIcon { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int Order { get; set; } = 0;
        public int ViewCount { get; set; } = 0;

        public int SectionId { get; set; }
        public virtual Section? Section { get; set; } = null!;

        public int CardId { get; set; }
        public virtual Card? Card { get; set; } = null!;
    }
}
