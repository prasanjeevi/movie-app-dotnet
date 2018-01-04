using server.Data;
using server.Models;
using System.Collections.Generic;
using System.Linq;

namespace server.Repositories
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly ApplicationDbContext dbContext;

        public MoviesRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // CREATE
        public void AddMovie(Movie movie)
        {
            dbContext.Movies.Add(movie);
            dbContext.SaveChanges();
        }

        // READ
        public IEnumerable<Movie> GetMovies()
        {
            dbContext.Movies.ToList().ForEach(m => m.IsRecommended = true);
            return dbContext.Movies;
        }

        public Movie GetMovie()
        {
            var lastMovie = dbContext.Movies.OrderByDescending(m => m.CreatedUtc).FirstOrDefault();
            if(lastMovie != null)
            {
                lastMovie.IsRecommended = true;
            }
            return lastMovie;
        }

        // DELETE
        public void DeleteMovie(int id)
        {
            var _movie = dbContext.Movies.FirstOrDefault(m => m.Id == id);
            dbContext.Movies.Remove(_movie);
            dbContext.SaveChanges();
        }


    }
}
