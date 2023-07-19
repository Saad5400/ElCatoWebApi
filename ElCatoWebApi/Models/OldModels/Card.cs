using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace ElCatoWebApi.Models.OldModels
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        [Required]

        public string DisplayName { get; set; }
        public int DisplayOrder { get; set; }
        [ValidateNever]
        public List<CardListItem> Items { get; set; }
    }
}
