describe('Modal Window Test', () => {

    beforeEach(() => {
        cy.pageAndDataLoad();
    })

    it('should check modal close by clicking on "X" button', () => {
        cy.get("[data-test='Булочка1']").click();
        cy.get("[data-test='modal_header']").should('have.text', 'Детали ингредиента');
        cy.get("[data-test='close_modal_button']").click();
        cy.get("[data-test='modal_header']").should('not.exist');
    })

    it('should check modal close by clicking on overlay', () => {
        cy.get("[data-test='Булочка1']").click();
        cy.get("[data-test='modal_header']").should('have.text', 'Детали ингредиента');
        cy.get("[data-test='modal_overlay']").click({force: true});
        cy.get("[data-test='modal_header']").should('not.exist');
    })

    it('should check modal close by pressing ESC button', () => {
        cy.get("[data-test='Булочка1']").click();
        cy.get("[data-test='modal_header']").should('have.text', 'Детали ингредиента');
        cy.get("[data-test='modal_header']").trigger('keydown', {key: 'Escape'});
        cy.get("[data-test='modal_header']").should('not.exist');
    })
})
