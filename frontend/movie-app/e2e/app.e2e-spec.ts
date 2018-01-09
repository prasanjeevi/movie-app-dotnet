import { MovieAppPage } from './app.po';
import { ExpectedConditions as EC, by } from 'protractor';

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
    expect(page.getRecommendationsSectionText()).toEqual('Recommendations Movies');
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

  it('when recommend/unrecommend toggle button is clicked it should change its state', () => {
    page.navigateTo();
    const firstToggleButton = page.getFirstRecommendOrUnrecommendButton();
    const stateBeforeClick = page.getFirstRecommendOrUnrecommendButtonState();

    stateBeforeClick.getAttribute('class').then((classes) => {
        if (classes.indexOf(' recommend') !== -1) {
            console.log('recommend to unrecommend')
            firstToggleButton.click();
            page.getFirstRecommendOrUnrecommendButtonState().getAttribute('class').then((classesAfterClick) => {
                expect(classesAfterClick.indexOf(' unrecommend') !== -1).toBeTruthy();
            })
        } else if (classes.indexOf(' unrecommend') !== -1) {
          console.log('unrecommend to recommend')
          firstToggleButton.click();
          page.getFirstRecommendOrUnrecommendButtonState().getAttribute('class').then((classesAfterClick) => {
              expect(classesAfterClick.indexOf(' recommend') !== -1).toBeTruthy();
          })
        }
    });
  });
});
