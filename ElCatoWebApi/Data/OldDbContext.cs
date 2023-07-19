using ElCatoWebApi.Models.OldModels;
using Microsoft.EntityFrameworkCore;

namespace ElCatoWebApi.Data
{
    public class OldDbContext : DbContext
    {
        public OldDbContext(DbContextOptions<OldDbContext> options) : base(options) { }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<CardListItem> CardListItems { get; set; }
        public DbSet<HomeAlert> HomeAlerts { get; set; }
    }
}
