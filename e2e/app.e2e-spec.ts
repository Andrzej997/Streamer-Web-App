import {StreamerPage} from './app.po';

describe('streamer App', function () {
  let page: StreamerPage;

  beforeEach(() => {
    page = new StreamerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
