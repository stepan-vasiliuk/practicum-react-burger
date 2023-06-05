describe('Make order.json test', () => {
    beforeEach(() => {
        cy.pageAndDataLoad();

        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
            fixture: 'order',
        }).as('postOrder');
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
            fixture: 'user',
        })
        window.localStorage.setItem("accessToken", JSON.stringify('access-token'));
        window.localStorage.setItem('refreshToken', JSON.stringify('refresh-token'));
    })


    it('should check make order functionality', () => {
        cy.get("[data-test='Булочка1']").trigger('dragstart');
        cy.get("[data-test='drop_target']").trigger('drop');

        cy.get("[data-test='item_top'] .constructor-element__text").should('have.text'
            , 'Булочка1 (верх)');
        cy.get("[data-test='item_bottom'] .constructor-element__text").should('have.text'
            , 'Булочка1 (низ)');

        cy.get("[data-test='order_button']").click();
        cy.get("[data-test='order_number']").contains(2121).should('exist');
    })
})