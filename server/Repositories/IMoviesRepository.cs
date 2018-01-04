using System.Collections.Generic;
using server.Models;

namespace server.Repositories
{
    public interface IMoviesRepository
    {
        void AddMovie(Movie movie);
        IEnumerable<Movie> GetMovies();
        Movie GetMovie();
        void DeleteMovie(int id);
    }
}