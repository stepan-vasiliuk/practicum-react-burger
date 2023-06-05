import * as cypress from "cypress";


Cypress.Commands.add('pageAndDataLoad', ()=> {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
        fixture: 'ingredients',
    });

    cy.visit('/');
})