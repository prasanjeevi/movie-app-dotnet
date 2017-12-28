import { browser, by, element } from 'protractor';

export class MovieAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root header nav a')).getText();
  }
}
