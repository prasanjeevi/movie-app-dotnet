using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using System.Net.Http; 
using Microsoft.Extensions.Options;
using server.Data;
using server.Models;
using server.Repositories;
using System;

namespace server.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly AppSettings appSettings;
        private readonly IMoviesRepository repository;
       
        public MoviesController(IOptions<AppSettings> appSettings, IMoviesRepository repository)
        {
            this.appSettings = appSettings.Value;
            this.repository = repository;
        }

        // GET api/movies/trending
        [Route("trending")]
        public IActionResult GetTrendingMovies()
        {
            try
            {
                var client = new HttpClient();
                var request = client.GetStringAsync(appSettings.GetTrendingMoviesUrl);
                var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
                ApplyRecommendation(response.Movies);
                return Ok(response.Movies);
            }
            catch(Exception ex)
            {
                return Ok(Util.SendErrorResponse("Unable to get trending movies", ex));
            }
        }

        // GET api/movies/upcoming
        [Route("upcoming")]
        public IActionResult GetUpcomingMovies()
        {
            try
            {
                var client = new HttpClient();
                var request = client.GetStringAsync(appSettings.GetUpcomingMoviesUrl);
                var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
                ApplyRecommendation(response.Movies);
                return Ok(response.Movies);
            }
            catch(Exception ex)
            {
                return Ok(Util.SendErrorResponse("Unable to get upcoming movies", ex));
            }
        }

        // GET api/movies/search
        [Route("search")]
        public IActionResult GetMovies(string query)
        {
            try
            {
                var client = new HttpClient();
                var request = client.GetStringAsync(appSettings.GetMoviesUrl + query);
                var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
                ApplyRecommendation(response.Movies);
                return Ok(response.Movies);
            }
            catch(Exception ex)
            {
                return Ok(Util.SendErrorResponse("Unable to get upcoming movies", ex));
            }
        }

        // GET api/movies/search
        [Route("search/director")]
        public IActionResult GetMoviesByDirector(string query)
        {
            try
            {
                var client = new HttpClient();
                var request = client.GetStringAsync(appSettings.GetMoviesByDirectorUrl + query);
                var response = JsonConvert.DeserializeObject<PersonApiResponse>(request.Result);

                List<Movie> movies = new List<Movie>();
                foreach (var person in response.People)
                {
                    movies.AddRange(person.KnownFor);
                }
                ApplyRecommendation(movies);
                return Ok(movies);
            }
            catch(Exception ex)
            {
                return Ok(Util.SendErrorResponse("Unable to search movies", ex));
            }
        }

        // GET api/movies/recommendations
        [Route("recommendations")]
        public IActionResult GetRecommendedMovies()
        {
            try
            {
                var client = new HttpClient();
                string latestInterestMovieId = repository.GetMovie().ToString();
                var request = client.GetStringAsync(appSettings.GetRecommendedMoviesUrl.Replace("{id}", latestInterestMovieId));
                var response = JsonConvert.DeserializeObject<MovieApiResponse>(request.Result);
                ApplyRecommendation(response.Movies);
                return Ok(response.Movies);
            }
            catch(Exception ex)
            {
                return Ok(Util.SendErrorResponse("Unable to get movie recommendations", ex));
            }
        }

        // GET api/movies/recommended
        [Route("recommended")]
        public IActionResult GetSavedRecommendedMovies()
        {
            try
            {
                return Ok(repository.GetMovies());
            }
            catch (Exception ex)
            {
                return Ok(Util.SendErrorResponse("Unable to get movie recommendations", ex));
            }
        }

        // POST api/movies/recommend
        [Route("recommend")]
        [HttpPost]
        public IActionResult RecommendMovie([FromBody]Movie movie)
        {
            try
            {
                repository.AddMovie(movie);
                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(Util.SendErrorResponse("Unable to update movie recommendation", ex));
            }
        }

        // DELETE api/movies/unrecommend/7
        [Route("unrecommend/{id}")]
        [HttpDelete]
        public IActionResult UnrecommendMovie(int id)
        {
            try
            {
                repository.DeleteMovie(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(Util.SendErrorResponse("Unable to update movie recommendation", ex));
            }
        }

        void ApplyRecommendation(IEnumerable<Movie> movies)
        {
            var recommended = from r in repository.GetMovies()
                              join m in movies
                              on r.Id equals m.Id
                              select m;

            foreach (var movie in recommended)
            {
                movie.IsRecommended = true;
            }

        }
    }
}
