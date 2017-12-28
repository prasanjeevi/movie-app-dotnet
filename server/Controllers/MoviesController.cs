using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private List<Movie> movies = new List<Movie>();

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
            var request = client.GetStringAsync($"https://api.themoviedb.org/3/movie/popular?api_key={appSettings.ApiKey}&language=en-US&page=1");
            var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
            return response.Movies;
        }

        // GET api/movies/upcoming
        [Route("upcoming")]
        public IEnumerable<Movie> GetUpcomingMovies()
        {
            var client = new HttpClient();
            var request = client.GetStringAsync($"https://api.themoviedb.org/3/movie/upcoming?api_key={appSettings.ApiKey}&language=en-US&page=1");
            var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
            return response.Movies;
        }

        // GET api/movies/search
        [Route("search")]
        public IEnumerable<Movie> GetMovies(string query)
        {
            var client = new HttpClient();
            var request = client.GetStringAsync($"https://api.themoviedb.org/3/search/movie?api_key={appSettings.ApiKey}&language=en-US&page=1&include_adult=false&query={query}");
            var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
            return response.Movies;
        }

        // GET api/movies/recommended
        [Route("recommended")]
        public IEnumerable<Movie> GetRecommendedMovies()
        {
            return movies;
        }

        // POST api/movies/recommend
        [Route("recommend")]
        [HttpPost]
        public void RecommendMovie([FromBody]Movie movie)
        {
            movies.Add(movie);
            //dbContext.Movies.Add(movie);
            //dbContext.SaveChanges();
        }

        // DELETE api/movies/unrecommend/7
        [Route("unrecommend")]
        [HttpDelete("{id}")]
        public void UnrecommendMovie(int id)
        {
            var _movie = movies.FirstOrDefault(m => m.Id == id);
            movies.Remove(_movie);
        }
    }
}
