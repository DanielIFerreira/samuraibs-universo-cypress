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

    context('quando o usuário é bom mais a senha está incorreta', () =>{

        let user = {
            name: 'Zequinha da Silva',
            email: 'zequinha@teste.com',
            password: 'pwd123',
            is_provider: true

        }

        before(function(){
            cy.postUser(user)
                .then(function(){
                    user.password = 'abc123'
                })
            
        })
        it('deve notificar erro de credenciais', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        });
    })

    context('quando o formato do email é invalido', () =>{

        const emails = [
            'daniel.com.br',
            '@gmail.com',
            '@',
            'daniel@',
            '123456',
            'x@te123',
        ]

        before(function(){
            loginPage.go()
        })
        emails.forEach(function(email){
            it('não deve logar com o email: ' + email , () => {
                const user = {email: email , password: 'pwd123'}
               
                
                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            });
        })
            
        
    })

    context('quando não preencho nenhum dos campos', () =>{
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'      
        ]

        before(function(){
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase , () => {
                loginPage.alert.haveText(alert)
            });
        })
    })
})