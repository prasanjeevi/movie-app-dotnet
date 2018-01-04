import { MovieAppPage } from './app.po';
import { ExpectedConditions as EC } from 'protractor';

describe('movie-app App', () => {
  let page: MovieAppPage;

  beforeEach(() => {
    page = new MovieAppPage();
  });

  it('should display brand name', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Movie');
  });

  // should have 3 sections
  it('should have trending section', () => {
    page.navigateTo();
    expect(page.getTrendingSectionText()).toEqual('Trending Movies');
  });

  it('should have forthcoming section', () => {
    page.navigateTo();
    expect(page.getForthcomingSectionText()).toEqual('Upcoming Movies');
  });

  it('should have recommendations section', () => {
    page.navigateTo();
    expect(page.getRecommendationsSectionText()).toEqual('Recommended Movies');
  });

  it('should have movies in trending section', () => {
    page.navigateTo();
    expect(page.getTrendingSectionMovies()).toBeGreaterThan(1);
  });

  it('should have movies in forthcoming section', () => {
    page.navigateTo();
    expect(page.getForthcomingSectionMovies()).toBeGreaterThan(1);
  });

  it('should have movies or no movies message in recommendations section', () => {
    page.navigateTo();
    const hasMovies = () => page.getRecommendationsSectionMovies().length > 1;
    const hasNoMoviesMessage = () => page.getRecommendationsSectionNoMoviesMessage() !== undefined;
    EC.or(hasMovies, hasNoMoviesMessage);
  });
});
