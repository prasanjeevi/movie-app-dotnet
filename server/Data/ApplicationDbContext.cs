using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() {}
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbOptions) : base(dbOptions) {}
        public DbSet<Movie> Movies { get; set; }

    }
}