describe('Album Page', () => {
  beforeEach(() => {
    cy.visit('/album/1418213110');

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

    cy.wait(1000);
  });

  it('should render the album page', () => {
    cy.url().should('include', 'album');
    cy.get('.row').should('be.visible');
    cy.get('.col').should('be.visible');
    cy.get('.card').should('be.visible');
    cy.get('audio').should('be.visible');
    cy.get('.card').should('be.visible');
    cy.get('.favorite-button').should('be.visible');
  });

  it('when clicked on the favorite button, it should add the music to the favorites in the localstorage', () => {
    cy.get('.favorite-button').first().click();

    cy.window().then((win) => {
      const actualValue = JSON.parse(win.localStorage.getItem('user'));

      expect(actualValue).to.have.property('favorites');
      expect(actualValue.favorites).to.have.length(1);
    });
  });

  it('should be possible to add multiple songs to favorites', () => {
    cy.get('.favorite-button').first().click();
    cy.get('.favorite-button').last().click();

    cy.window().then((win) => {
      const actualValue = JSON.parse(win.localStorage.getItem('user'));

      expect(actualValue).to.have.property('favorites');
      expect(actualValue.favorites).to.have.length(2);
    });
  });

  it('should be possible to delete a song from favorites', () => {
    cy.get('.favorite-button').first().click();

    cy.window().then((win) => {
      const actualValue = JSON.parse(win.localStorage.getItem('user'));

      expect(actualValue).to.have.property('favorites');
      expect(actualValue.favorites).to.have.length(1);
    });
    cy.get('.favorite-button').first().click();
    cy.window().then((win) => {
      const actualValue = JSON.parse(win.localStorage.getItem('user'));

      expect(actualValue.favorites).to.have.length(0);
    });
  });
});
