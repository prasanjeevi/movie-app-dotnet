import { SearchPage } from './search.po';
import { ExpectedConditions as EC, browser } from 'protractor';

describe('movie-app App search page', () => {
  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
  });

  it('should get search results when type', () => {
    page.navigateTo();

    page.getSearchTextField().sendKeys('spider');

    expect(page.getSearchResultsSectionText()).toEqual('Search Results');

    const hasMovies = () => page.getSearchResultsSectionMovies().length > 1;
    const hasNoMoviesMessage = () => page.getSearchResultsSectionNoMoviesMessage() !== undefined;
    EC.or(hasMovies, hasNoMoviesMessage);
  });

  it('should have movies or no movies message in recommendations section', () => {
    page.navigateTo();
    const hasMovies = () => page.getRecommendationsSectionMovies().length > 1;
    const hasNoMoviesMessage = () => page.getRecommendationsSectionNoMoviesMessage() !== undefined;
    EC.or(hasMovies, hasNoMoviesMessage);
  });
});
