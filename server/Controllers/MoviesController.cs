using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using System.Net.Http; 
using Microsoft.Extensions.Options;
using server.Data;

namespace server.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly AppSettings appSettings;
        private readonly ApplicationDbContext dbContext;
       
        public MoviesController(IOptions<AppSettings> appSettings, ApplicationDbContext dbContext)
        {
            this.appSettings = appSettings.Value;
            this.dbContext = dbContext;
        }

        // GET api/movies/trending
        [Route("trending")]
        public IEnumerable<Movie> GetTrendingMovies()
        {
            var client = new HttpClient();
            var request = client.GetStringAsync(appSettings.GetTrendingMoviesUrl);
            var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
            ApplyRecommendation(response.Movies);
            return response.Movies;
        }

        // GET api/movies/upcoming
        [Route("upcoming")]
        public IEnumerable<Movie> GetUpcomingMovies()
        {
            var client = new HttpClient();
            var request = client.GetStringAsync(appSettings.GetUpcomingMoviesUrl);
            var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
            ApplyRecommendation(response.Movies);
            return response.Movies;
        }

        // GET api/movies/search
        [Route("search")]
        public IEnumerable<Movie> GetMovies(string query)
        {
            var client = new HttpClient();
            var request = client.GetStringAsync(appSettings.GetMoviesUrl + query);
            var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
            ApplyRecommendation(response.Movies);
            return response.Movies;
        }

        // GET api/movies/search
        [Route("search/director")]
        public IEnumerable<Movie> GetMoviesByDirector(string query)
        {
            var client = new HttpClient();
            var request = client.GetStringAsync(appSettings.GetMoviesByDirectorUrl + query);
            var response = JsonConvert.DeserializeObject<PersonApiResponse>(request.Result);

            List<Movie> movies = new List<Movie>();
            foreach(var person in response.People)
            {
                movies.AddRange(person.KnownFor);
            }
            ApplyRecommendation(movies);
            return movies;
        }

        // GET api/movies/recommended/{id}
        [Route("recommended/{id}")]
        public IEnumerable<Movie> GetRecommendedMovies(string id)
        {
            var client = new HttpClient();
            var request = client.GetStringAsync(appSettings.GetRecommendedMoviesUrl.Replace("{id}", id));
            var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
            ApplyRecommendation(response.Movies);
            return response.Movies;
        }

        // POST api/movies/recommend
        [Route("recommend")]
        [HttpPost]
        public void RecommendMovie([FromBody]Movie movie)
        {
            dbContext.Movies.Add(movie);
            dbContext.SaveChanges();
        }
    
        // DELETE api/movies/unrecommend/7
        [Route("unrecommend/{id}")]
        [HttpDelete]
        public void UnrecommendMovie(int id)
        {
            var _movie = dbContext.Movies.FirstOrDefault(m => m.Id == id);
            dbContext.Movies.Remove(_movie);
            dbContext.SaveChanges();
        }

        void ApplyRecommendation(IEnumerable<Movie> movies)
        {
            var recommended = from r in GetSavedRecommendedMovies()
                              join m in movies
                              on r.Id equals m.Id
                              select m;

            foreach (var movie in recommended)
            {
                movie.IsRecommended = true;
            }

        }

        IEnumerable<Movie> GetSavedRecommendedMovies()
        {
            dbContext.Movies.ToList().ForEach(m => m.IsRecommended = true);
            return dbContext.Movies;
        }
    }
}
