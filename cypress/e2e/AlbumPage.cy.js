import 'cypress-axios';

describe('Album Page', () => {
  beforeEach(() => {
    cy.visit('/album/123');
  });

  it('Teste da chamada de API', () => {
    cy.intercept('GET', '/sua-api/endpoint', {
      fixture: 'album.json',
    }).as('getAlbum');

    cy.wait('@getAlbum');

    cy.get('@getAlbum').should((interception) => {
      expect(interception.response.body).to.have.property(
        'albumProperty',
        'valorEsperado'
      );
    });
  });
});
