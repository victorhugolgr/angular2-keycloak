import { Angular2KeycloakPage } from './app.po';

describe('angular2-keycloak App', () => {
  let page: Angular2KeycloakPage;

  beforeEach(() => {
    page = new Angular2KeycloakPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
