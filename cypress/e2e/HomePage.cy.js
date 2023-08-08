describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/home');

    const user = {
      userpicture: 'user.jpg',
      name: 'John Doe',
      username: '@johndoe',
      email: 'john@doe.com',
      password: '123456',
    };

    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user));
    });
  });

  it('should render all elements on screen', () => {
    cy.get('#floatinSearchInput').should('be.visible');
    cy.contains('Your search result will appear here');
    cy.contains('Itunes Music');
    cy.contains('John Doe');
    cy.contains('@johndoe');
    cy.get('.navbar').should('be.visible');
    cy.get('.nav').should('have.length', 2);
    cy.get('button').should('have.length', 4);
    cy.get('img').should('be.visible');
  });

  it('should return a "result not found" if search for an invalid input', () => {
    cy.get('label').contains('albums');
    cy.get('#floatinSearchInput').type('123456');
    cy.get('#searchButton').click();
    cy.contains('Result not found');

    cy.get('#controlled-homepage-tab-tab-songs').click();
    cy.get('label').contains('songs');
    cy.contains('Result not found');
  });

  it('loading spinner should be visible on the screen', () => {
    cy.get('#searchButton').click();
    cy.get('.spinner-border').should('be.visible');
    cy.get('.spinner-border').should('not.exist');
  });

  it('should redirect to /profile if clicked on the user photo', () => {
    cy.get('img').click();
    cy.url().should('include', 'profile');
  });

  it('should redirect to /favorites if clicked on the heart shaped icon and come back to homePage if clicked on the house shaped icon', () => {
    cy.get('#favorites-nav-link').click();
    cy.url().should('include', 'favorites');

    cy.get('#home-nav-link').click();
    cy.url().should('include', 'home');
  });

  it('should display all the albums and songs on the screen if is a valid name', () => {
    cy.get('label').contains('albums');
    cy.get('#floatinSearchInput').type('The Beatles');
    cy.get('#searchButton').click();
    cy.get('.card').should('be.visible');

    cy.get('#controlled-homepage-tab-tab-songs').click();
    cy.get('label').contains('songs');
    cy.get('.card').should('be.visible');
  });

  it('should redirect to /albums/:id page if clicked on the album card', () => {
    cy.get('label').contains('albums');
    cy.get('#floatinSearchInput').type('Kendrick Lamar');
    cy.get('#searchButton').click();
    cy.get('.card').should('be.visible');
    cy.get('.card').first().click();
    cy.url().should('include', /album/);
  });
});
