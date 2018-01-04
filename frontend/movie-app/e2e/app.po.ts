import { browser, by, element, $ } from 'protractor';

export class MovieAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root header nav a')).getText();
  }

  getTrendingSectionText() {
    return element(by.css('#trending h3')).getText();
  }

  getForthcomingSectionText() {
    return element(by.css('#forthcoming h3')).getText();
  }

  getRecommendationsSectionText() {
    return element(by.css('#recommendations h3')).getText();
  }

  getTrendingSectionMovies() {
    return element.all(by.css('#trending .movie-card')).count();
  }

  getForthcomingSectionMovies() {
    return element.all(by.css('#forthcoming .movie-card')).count();
  }

  getRecommendationsSectionMovies() {
    return $('#recommendations .movie-card');
  }

  getRecommendationsSectionNoMoviesMessage() {
    return $('#recommendations p#no-movies');
  }
}
