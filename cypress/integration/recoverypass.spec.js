/// <reference types="cypress"/>
import ForgotPassPage from '../support/pages/forgotpass'


describe('regaste de senha', function() {

    before(function(){
        cy.fixture('recovery').then(function(recovery){
            this.data = recovery
        })
    })

    context('quando o usuário esquece a senha', function(){

        before(function(){
            cy.postUser(this.data)
        })

        it('deve conseguir resgatar a senha por email',function() {
            ForgotPassPage.go()
            ForgotPassPage.form(this.data.email)
            ForgotPassPage.submit()
            ForgotPassPage.toast.shouldHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')
        });
    })
})