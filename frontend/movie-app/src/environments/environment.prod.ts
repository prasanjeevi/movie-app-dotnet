export const environment = {
  production: true,
  serviceUrls: {
    trending: 'http://localhost:5000/api/movies/trending',
    upcoming: 'http://localhost:5000/api/movies/upcoming',
    recommendations: 'http://localhost:5000/api/movies/recommendations',
    recommended: 'http://localhost:5000/api/movies/recommended',
    recommend: 'http://localhost:5000/api/movies/recommend',
    unrecommend: 'http://localhost:5000/api/movies/unrecommend',
    searchByMovie: 'http://localhost:5000/api/movies/search?query=',
    searchByDirector: 'http://localhost:5000/api/movies/search/director/?query='
  }
};
