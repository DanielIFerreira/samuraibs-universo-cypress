/// <reference types="cypress"/>
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', () => {

    context('quando o usuário é muito bom', () => {
        const user = {
            name: 'Daniel Ferreira',
            email: "daniel.i.ferreira@outlook.com",
            password: "pwd123",
            is_provider: true
        }

        //Usado para sempre apagar o user do banco e refazer novamente
        before(function () {
            //implementação na camada commands
            cy.postUser(user)
        })

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
        });
    })
})