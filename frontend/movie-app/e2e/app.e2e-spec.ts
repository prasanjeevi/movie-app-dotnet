import { MovieAppPage } from './app.po';

describe('movie-app App', () => {
  let page: MovieAppPage;

  beforeEach(() => {
    page = new MovieAppPage();
  });

  it('should display brand name', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Movie');
  });
});
