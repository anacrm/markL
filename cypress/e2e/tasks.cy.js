/// <reference types="cypress" /> 
import { faker } from '@faker-js/faker';


describe('Tasks', () => {

    let testData

    before(() => {
        cy.fixture('tasks').then((t) => {
            testData = t
        })
    })

    context('Task Registration', () => {

        it('It should publish a new task', () => {

            const taskName = "Household chores"

            cy.removeTaskbyName(taskName)

            cy.createTask(taskName)

            cy.contains('main div p', taskName).should('be.visible').should('have.text', taskName)
        })
        it('It should not permit register the same task more then one time', () => {

            const task = testData.dup

            cy.removeTaskbyName(task.name)

            //Given
            cy.postTesk(task)

            //when
            cy.createTask(task.name)

            //Then
            cy.get('.swal2-html-container').should('be.visible').should('have.text', 'Task already exists!')
        })
        it('Required field', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })

    context('Task Update', () => {
        it('It should solve a tesk', () => {

            const task = {
                name: "Pay energy bill",
                is_done: false
            }

            cy.removeTaskbyName(task.name)
            cy.postTesk(task)


            cy.visit('/')

            cy.contains('p', task.name).parent().find('button[class*=ItemToggle]').click()
            cy.contains('p', task.name).should('have.css', 'text-decoration-line', 'line-through')

        })
    })

    context('Delete Task', () => {
        it('It should delete a tesk', () => {

            const task = {
                name: "Pay credit car bill",
                is_done: false
            }

            cy.removeTaskbyName(task.name)
            cy.postTesk(task)


            cy.visit('/')

            cy.contains('p', task.name).parent().find('button[class*=ItemDelete]').click()
            cy.contains('p', task.name).should('not.exist')

        })
    })

})