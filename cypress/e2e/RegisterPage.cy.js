describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should render the register modal', () => {
    cy.get('.modal').should('be.visible');
    cy.contains('Itunes Music').should('be.visible');
    cy.contains('Register').should('be.visible');
    cy.contains('choose a picture').should('be.visible');
    cy.get('input[type="text"]').should('have.length', 2);
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('should display error message when registering with empty fields', () => {
    cy.get('button').contains('Register').click();
    cy.contains('All fields are required.').should('be.visible');

    cy.get('#floatingNameInput').type('{enter}');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('peter.parker@gmail.com');
    cy.get('#floatingPassword').type('123456');
    cy.get('button').contains('Register').click();
    cy.contains('All fields are required.').should('be.visible');

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('{enter}');
    cy.get('#floatingEmailInput').type('peter.parker@gmail.com');
    cy.get('#floatingPassword').type('123456');
    cy.get('button').contains('Register').click();
    cy.contains('All fields are required.').should('be.visible');

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('{enter}');
    cy.get('#floatingPassword').type('123456');
    cy.get('button').contains('Register').click();
    cy.contains('All fields are required.').should('be.visible');

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('peterparker@gmail.com');
    cy.get('#floatingPassword').type('{enter}');
    cy.get('button').contains('Register').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('should allow user to select profile picture', () => {
    const imagePath = 'image.jpg';

    cy.fixture(imagePath, { encoding: 'base64' }).as('myFixtureImage');
    cy.get('input[type="file"]').selectFile('@myFixtureImage', { force: true });

    cy.get('img').should('be.visible');
  });

  it('should display error message when registering with invalid fields', () => {
    cy.get('#floatingNameInput').type('a');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('peter.parker@gmail.com');
    cy.get('#floatingPassword').type('123456');
    cy.get('button').contains('Register').click();
    cy.contains('Invalid fields.').should('be.visible');

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('spider man');
    cy.get('#floatingEmailInput').type('peter.parker@gmail.com');
    cy.get('#floatingPassword').type('123456');
    cy.get('button').contains('Register').click();
    cy.contains('Invalid fields.').should('be.visible');

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('123');
    cy.get('#floatingPassword').type('123456');
    cy.get('button').contains('Register').click();
    cy.contains('Invalid fields.').should('be.visible');

    cy.get('#floatingNameInput').type('Peter Parker');
    cy.get('#floatingUsernameInput').type('@peterparker');
    cy.get('#floatingEmailInput').type('peterparker@gmail.com');
    cy.get('#floatingPassword').type('123');
    cy.get('button').contains('Register').click();
    cy.contains('Invalid fields.').should('be.visible');
  });

  it('should save user data and redirect to /home', () => {
    const userData = {
      name: 'John Doe',
      username: '@johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    };

    cy.get('#floatingNameInput').type(userData.name);
    cy.get('#floatingUsernameInput').type(userData.username);
    cy.get('#floatingEmailInput').type(userData.email);
    cy.get('#floatingPassword').type(userData.password);
    cy.get('button').contains('Register').click();

    cy.window().then((window) => {
      const user = JSON.parse(window.localStorage.getItem('user'));
      expect(user.name).to.equal(userData.name);
      expect(user.username).to.equal(userData.username);
      expect(user.email).to.equal(userData.email);
      expect(user.password).to.equal(userData.password);
      expect(user.userpicture).to.exist;
    });
    cy.url().should('include', '/home');
  });
});
