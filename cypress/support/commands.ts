import * as cypress from "cypress";


// @ts-ignore
Cypress.Commands.add('pageAndDataLoad', ()=> {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
        fixture: 'ingredients',
    });

    cy.visit('/');
})