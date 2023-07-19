using ElCatoWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ElCatoWebApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Section> Sections { get; set; } = null!;
        public DbSet<Card> Cards { get; set; } = null!;
        public DbSet<Page> Pages { get; set; } = null!;
    }
}
