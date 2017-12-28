using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbOptions) : base(dbOptions)
        {
            Database.EnsureCreated();
        }
        public DbSet<Movie> Movies { get; set; }

    }
}