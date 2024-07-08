describe('template spec', () => {
    it('doest find admin page', () => {
        cy.request({url: 'http://localhost:3000/admin', failOnStatusCode: false}).its('status').should('equal', 404)
      
    });
  });
  