using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace ElCatoWebApi.Models.OldModels
{
    public class CardListItem
    {
        [Key]
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string? CssClasses { get; set; }
        public string? Icon { get; set; }
        public string? Href { get; set; }
        public int DisplayOrder { get; set; }


        public int CardId { get; set; }
        [ValidateNever]
        public virtual Card Card { get; set; }

        public int? PageId { get; set; }
        public virtual Page? Page { get; set; }
    }
}
