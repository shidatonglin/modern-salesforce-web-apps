import { NgAppTestPage } from './app.po';

describe('ng-app-test App', function() {
  let page: NgAppTestPage;

  beforeEach(() => {
    page = new NgAppTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
