import { browser, by, element, ExpectedConditions as EC, $ } from 'protractor';

export class SearchPage {
  navigateTo() {
    return browser.get('/recommendations');
  }

  getSearchTextField() {
    return element(by.id('search-text-field'));
  }

  getSearchResultsSectionText() {
    return element(by.css('#search-results h3')).getText();
  }

  getSearchResultsSectionMovies() {
    return $('#search-results .movie-card');
  }

  getSearchResultsSectionNoMoviesMessage() {
    return $('#search-results p#no-movies');
  }

  getRecommendationsSectionText() {
    return element(by.css('#recommendations h3')).getText();
  }

  getRecommendationsSectionMovies() {
    return $('#recommendations .movie-card');
  }

  getRecommendationsSectionNoMoviesMessage() {
    return $('#recommendations p#no-movies');
  }
}
