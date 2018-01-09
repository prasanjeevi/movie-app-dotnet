// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
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
