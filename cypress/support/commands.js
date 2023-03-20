/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createTask', (taskName = '') => {


    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if (taskName != '') {
        cy.get('@inputTask').type(taskName)
    }
    cy.contains('button', 'Create').click()


})

Cypress.Commands.add('removeTaskbyName', (taskName) => {
    cy.request({
        method: 'DELETE',
        url: Cypress.env('apiUrl') + '/helper/tasks',
        body: {
            name: taskName,
        },
    }).then((response) => {
        expect(response.status).deep.equal(204)
    })
})

Cypress.Commands.add('postTesk', (task) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl') + '/tasks',
        body: {
            name: task.name,
            is_done: task.is_done
        },
    }).then((response) => {
        expect(response.status).deep.equal(201)
    })
})

Cypress.Commands.add('isRequired', (targetMessage) => {

    cy.get('@inputTask').invoke('prop', 'validationMessage').should((text) => {
        expect(targetMessage).to.eql(text)
    })
})