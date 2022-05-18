
import {el} from '../../pages/dash/elements'

class Header {
    userLoggedIn(userName) {
        cy.get(el.validationName, {timeout: 7000})
            .should('be.visible')
            .should('have.text', userName)
        
    }
}

export default new Header()