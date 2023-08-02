using System.ComponentModel.DataAnnotations;

namespace ElCatoWebApi.Models
{
    public class Card
    {

        public static Func<Card?, dynamic> MinimalSelector =>
            c => new { c?.Id, c?.Title, c?.Subtitle, c?.Order, c?.SectionId };

        public static Func<Card?, dynamic> WithSectionSelector =>
            c => new { c?.Id, c?.Title, c?.Subtitle, c?.Order, c?.SectionId, Section = Models.Section.MinimalSelector(c?.Section) };

        public static Func<Card?, dynamic> WithPagesSelector =>
            c => new { c?.Id, c?.Title, c?.Subtitle, c?.Order, c?.SectionId, Pages = c?.Pages?.Where(p => p.Accepted == true).Select(p => Page.MinimalSelector(p)) };
        
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public int Order { get; set; } = 0;

        public int SectionId { get; set; }
        public virtual Section? Section { get; set; } = null!;

        public virtual ICollection<Page>? Pages { get; set; } = new List<Page>();
    }
}
