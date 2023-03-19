/// <reference types="cypress" /> 
//intellisense


describe('Home page', () => {
    it('app should be online', () => {
        cy.visit('/')
        cy.title().should('eql', 'Gerencie suas tarefas com Mark L')
    })
})