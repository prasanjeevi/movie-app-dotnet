using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using System.Net.Http; 
using Microsoft.Extensions.Options;

namespace server.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly AppSettings appSettings;

        public MoviesController(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
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

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
