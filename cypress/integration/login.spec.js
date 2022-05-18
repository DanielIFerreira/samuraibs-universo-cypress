/// <reference types="cypress"/>
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', ()=>{

    context('quando o usuário é muito bom', () =>{
        const user = {
            name: 'Daniel Ferreira',
            email:"daniel.i.ferreira@outlook.com",
            password:"pwd123"
        }
        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit() 
            dashPage.header.userLoggedIn(user.name)
        });
    })
})