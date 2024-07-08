describe('template spec', () => {
    it('visits category', () => {
      cy.visit('http://localhost:3000');
      cy.get('#__next > nav > div:nth-child(2) > ul > li:nth-child(1) > a').click();
    });
  });