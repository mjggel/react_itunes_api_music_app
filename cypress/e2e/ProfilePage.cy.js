describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/profile');

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
    cy.get('.modal-content').should('be.visible');
    cy.get('#nonEditableProfileInfo').should('be.visible');
    cy.get('#nonEditableUserPicture').should('be.visible');
    cy.get('#nonEditableUsername').should('be.visible');
    cy.get('#nonEditableName').should('be.visible');
    cy.get('#nonEditableEmail').should('be.visible');
    cy.get('#editProfileButton').should('be.visible');
  });

  it('when clicked on the edit profile button should change form to Editable inputs', () => {
    cy.get('.modal-content').should('be.visible');
    cy.get('#editProfileButton').click();

    cy.get('#editableProfileInfo').should('be.visible');
    cy.get('#floatingNameInput').should('be.visible');
    cy.get('#floatingUsernameInput').should('be.visible');
    cy.get('#floatingEmailInput').should('be.visible');
    cy.get('#floatingPassword').should('be.visible');
    cy.get('#saveInfoButton').should('be.visible');

    cy.get('#nonEditableProfileInfo').should('not.exist');
    cy.get('#nonEditableUserPicture').should('not.exist');
    cy.get('#nonEditableUsername').should('not.exist');
    cy.get('#nonEditableName').should('not.exist');
    cy.get('#nonEditableEmail').should('not.exist');
    cy.get('#editProfileButton').should('not.exist');
  });

  it('should allow user to select profile picture', () => {
    cy.get('#editProfileButton').click();

    const imagePath = 'pictures/user.jpg';

    cy.fixture(imagePath, { encoding: null }).as('myFixtureImage');

    cy.get('input[type="file"]').selectFile('@myFixtureImage', { force: true });

    cy.get('img').should('be.visible');
  });

  it('should allow user to change all user information', () => {
    cy.get('#editProfileButton').click();

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('peter.parker@gmail.com');
    cy.get('#floatingPassword').type('peter123456');
    cy.get('#saveInfoButton').click();

    cy.window().then((win) => {
      const actualValue = JSON.parse(win.localStorage.getItem('user'));
      const expectedValue = {
        userpicture: 'user.jpg',
        name: 'Peter Parker',
        username: '@peterparker',
        email: 'peter.parker@gmail.com',
        password: 'peter123456',
      };

      expect(actualValue).to.deep.equal(expectedValue);
    });
  });

  it('should not be possible to save an invalid profile information', () => {
    cy.get('#editProfileButton').click();

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('peter.parker@gmail.com');
    cy.get('#floatingPassword').type('123');
    cy.get('#saveInfoButton').click();
    cy.contains('Invalid fields').should('be.visible');
    cy.contains('Password must be at least 6 characters').should('be.visible');

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('spiderman');
    cy.get('#floatingEmailInput').type('peter.parker@gmail.com');
    cy.get('#floatingPassword').type('123456');
    cy.get('#saveInfoButton').click();
    cy.contains('Invalid fields').should('be.visible');
    cy.contains('Invalid username').should('be.visible');

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('123');
    cy.get('#floatingPassword').type('123456');
    cy.get('#saveInfoButton').click();
    cy.contains('Invalid fields').should('be.visible');
    cy.contains('Invalid email.').should('be.visible');
  });

  it('if saved without any changes, all info should be the same', () => {
    cy.get('#editProfileButton').click();

    cy.get('#saveInfoButton').click();

    cy.window().then((win) => {
      const actualValue = JSON.parse(win.localStorage.getItem('user'));
      const expectedValue = {
        userpicture: 'user.jpg',
        name: 'John Doe',
        username: '@johndoe',
        email: 'john@doe.com',
        password: '123456',
      };

      expect(actualValue).to.deep.equal(expectedValue);
    });
  });
});
