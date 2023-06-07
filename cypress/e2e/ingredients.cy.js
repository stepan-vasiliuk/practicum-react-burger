describe('Ingredients data successfully loaded', () => {

    it('should check ingredients array length', () => {
        cy.pageAndDataLoad();
        cy.get('ul>a>li').should('have.length', 6);
    });
})