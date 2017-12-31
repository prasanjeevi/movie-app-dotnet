using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using server.Controllers;
using server.Data;
using server.Models;
using System.Linq;
using Xunit;

namespace server.Tests
{
    public class MoviesControllerTest
    {
        public MoviesControllerTest()
        {
            InitContext();
        }

        private ApplicationDbContext dbContext;
        private IOptions<AppSettings> appSettings;

        void InitContext()
        {
            var settings = Options.Create(new AppSettings()
            {
                GetTrendingMoviesUrl = "https://api.themoviedb.org/3/movie/popular?api_key=cae6efb829ee2ade77e8335f8b5f8c23&language=en-US&page=1",
                GetUpcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=cae6efb829ee2ade77e8335f8b5f8c23&language=en-US&page=1",
                GetMoviesUrl = "https://api.themoviedb.org/3/search/movie?api_key=cae6efb829ee2ade77e8335f8b5f8c23&language=en-US&page=1&include_adult=false&sort_by=popularity.desc&query=",
                GetMoviesByDirectorUrl = "https://api.themoviedb.org/3/search/person?api_key=cae6efb829ee2ade77e8335f8b5f8c23&language=en-US&page=1&include_adult=false&sort_by=popularity.desc&query=",
                GetRecommendedMoviesUrl = "https://api.themoviedb.org/3/movie/{id}/similar?api_key=cae6efb829ee2ade77e8335f8b5f8c23&language=en-US&page=1&include_adult=false&sort_by=popularity.desc"
            });

            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("MovieDb")
                .UseInternalServiceProvider(serviceProvider);

            var context = new ApplicationDbContext(builder.Options);
            var movies = Enumerable.Range(1, 10)
                .Select(i => new Movie { Id = i, Title = $"IT{i}", Overview = "Movie Description", BackdropPath = "img.png", VoteAverage = 7, IsRecommended = false });
            context.Movies.AddRange(movies);
            context.SaveChanges();

            dbContext = context;
            appSettings = settings;
        }

        [Fact]
        public void TestGetTrendingMovies()
        {
            // Arrange
            var controller = new MoviesController(appSettings, dbContext);

            // Act
            var result = controller.GetTrendingMovies() as OkObjectResult;
            
            // Assert
            Assert.NotNull(result);
            var movies = result.Value as Movie[];
            Assert.NotNull(movies);
            Assert.Equal(200, result.StatusCode);
        }

        [Fact]
        public void TestGetUpcomingMovies()
        {
            // Arrange
            var controller = new MoviesController(appSettings, dbContext);

            // Act
            var result = controller.GetUpcomingMovies() as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            var movies = result.Value as Movie[];
            Assert.NotNull(movies);
            Assert.Equal(200, result.StatusCode);
        }

        [Fact]
        public void TestGetSavedRecommendedMovies()
        {
            // Arrange
            var controller = new MoviesController(appSettings, dbContext);

            // Act
            var result = controller.GetSavedRecommendedMovies() as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
        }

        [Fact]
        public void TestRecommendMovie()
        {
            // Arrange
            var controller = new MoviesController(appSettings, dbContext);
            var movie = new Movie { Id = 1, Title = "IT", Overview = "Movie Description", BackdropPath = "img.png", VoteAverage = 7, IsRecommended = false };
            // Act
            var result = controller.RecommendMovie(movie) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
        }

        [Fact]
        public void TestGetMovies()
        {
            // Arrange
            var controller = new MoviesController(appSettings, dbContext);
            var query = "IT";

            // Act
            var result = controller.GetMovies(query) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
        }
    }
}