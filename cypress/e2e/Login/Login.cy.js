describe('testing Itunes Music app', () => {
  beforeEach(() => {
    cy.visit('/login');
    const user = {
      name: 'John Doe',
      username: '@john.doe',
      email: 'john@doe.com',
      password: '123456',
      rememberMe: false,
    };

    cy.window().then((win) => {
      win.localStorage.setItem('users', JSON.stringify([user]));
    });
  });

  it('should display the login modal on the screen', () => {
    cy.contains('Itunes Music').should('be.visible');
    cy.contains('Login').should('be.visible');
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('Log in').should('be.visible');
    cy.contains('Register').should('be.visible');
    cy.contains('Remember me').should('be.visible');
  });

  it('should display error message when one or all fields are empty', () => {
    cy.contains('Log in').click();
    cy.contains('Both password and username are required.').should(
      'be.visible'
    );

    cy.get('input[type="text"]').type('@john.doe');
    cy.contains('Log in').click();
    cy.contains('Both password and username are required.').should(
      'be.visible'
    );

    cy.get('input[type="text"]').clear().type('{enter}');
    cy.contains('Log in').click();
    cy.contains('Both password and username are required.').should(
      'be.visible'
    );
  });

  it('should display error message when trying to log in with a non-existent user', () => {
    cy.get('input[type="text"]').type('@brucewayne');
    cy.get('input[type="password"]').type('bat123456');
    cy.contains('Log in').click();
    cy.contains('Username or password are incorrect.').should('be.visible');
  });

  it('should display error message when trying to log in with the wrong user info', () => {
    cy.get('input[type="text"]').type('@brucewayne');
    cy.get('input[type="password"]').type('123456');
    cy.contains('Log in').click();
    cy.contains('Username or password are incorrect.').should('be.visible');

    cy.get('input[type="text"]').clear().type('@john.doe');
    cy.get('input[type="password"]').clear().type('123');
    cy.contains('Log in').click();
    cy.contains('Username or password are incorrect.').should('be.visible');
  });

  it('should redirect to /home when log in is successful', () => {
    cy.get('input[type="text"]').type('@john.doe');
    cy.get('input[type="password"]').type('123456');
    cy.contains('Log in').click();
    cy.url().should('include', '/home');
  });

  it('should redirect to /register when Register button is clicked', () => {
    cy.contains('Register').click();
    cy.url().should('include', '/register');
  });

  it('should redirect to /register without the need to click the register button if there is no user in the localstorage', () => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });

    cy.visit('/login');

    cy.url().should('include', '/register');
  });

  it('should redirect to /home without the need to click the Log in button if there is a Remember me user', () => {
    const user = {
      name: 'John Doe',
      username: '@john.doe',
      email: 'john@doe.com',
      password: '123456',
      rememberMe: true,
    };

    cy.window().then((win) => {
      win.localStorage.setItem('users', JSON.stringify([user]));
    });

    cy.visit('/login');

    cy.url().should('include', '/home');
  });
});
