namespace server.Models
{
    public class AppSettings
    {
        public string ApiKey { get; set; }
        public string GetTrendingMoviesUrl { get; set; }
        public string GetUpcomingMoviesUrl { get; set; }
        public string GetMoviesUrl { get; set; }
        public string GetMoviesByDirectorUrl { get; set; }
        public string GetRecommendedMoviesUrl { get; set; }
    }
}