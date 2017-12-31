// using server.Controllers;
// using server.Models;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Options;
// using System;
// using System.Linq;
// using Xunit;

// namespace server.Tests
// {
//     public class MoviesControllerTest
//     {
//         public MoviesControllerTest()
//         {
//             InitContext();
//         }

//         private ApplicationDbContext dbContext;
//         private IOptions<AppSettings> appSettings;

//         public void InitContext()
//         {
//             var settings = Options.Create(new AppSettings()
//             {
//                 GetTrendingMoviesUrl = "https://api.themoviedb.org/3/movie/popular?api_key=cae6efb829ee2ade77e8335f8b5f8c23&language=en-US&page=1"
//             });

//             var builder = new DbContextOptionsBuilder<ApplicationDbContext>()
//                 .UseInMemoryDatabase();

//             var context = new ApplicationDbContext(builder.Options);
//             var movies = Enumerable.Range(1, 10)
//                 .Select(i => new Movie { Id = i, Title = $"IT", Overview = "Movie Description", BackdropPath = "img.png", VoteAverage = 7, IsRecommended = false });
//             context.Movies.AddRange(movies);
//             context.SaveChanges();
//             dbContext = context;
//         }

//         [Fact]
//         public void TestGetTrendingMovies()
//         {
//             string expectedTitle = "IT";
//             var controller = new MoviesController(appSettings, dbContext);
//             var result = controller.GetTrendingMovies(2);
//             Assert.Equal(expectedTitle, result.Title);
//         }
//     }
// }