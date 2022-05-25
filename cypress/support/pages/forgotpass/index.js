/// <reference types="cypress"/>
import {el}  from "../forgotpass/elements"
import toast from '../../components/toast'
import alert from '../../components/alert'

class ForgotPassPage {

    constructor(){
        this.toast = toast
        this.alert = alert
    }
    go() {
        cy.visit('/forgot-password')
    }

    form(email) {
        cy.get(el.email)
            .clear()
            .type(email)
    }

    submit() {
        cy.contains('button[type="submit"]', 'Recuperar')
            .click()
    }
    
}

export default new ForgotPassPage()