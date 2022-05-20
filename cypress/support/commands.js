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

//Função ou Metodo para remoção e dastro do usuario no banco
Cypress.Commands.add('postUser', function (user) {
    //Sempre apaga do banco
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })
    //Sempre cadastra no banco
    cy.request(
        'POST',
        'http://localhost:3333/users',
        user

    ).then(function (response) {
        expect(response.status).to.eq(200)
    })
})