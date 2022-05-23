//import faker from '@faker-js/faker';
import signupPage from '../support/pages/signup/index'
describe('cadastro', function () {

    before(function() {
        cy.fixture('signup')
            .then(function(signup){
                this.success = signup.success
                this.email_duplicado = signup.email_duplicado
                this.email_inv = signup.email_inv
                this.short_password = signup.short_password
            })
    })
    context('quando o usuário é um novato', function() {

        before(function () {
            //Tarefa para dar roolback no banco e apagar o email cadastrado
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })


        it('deve cadastrar com sucesso', function() {
            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        });
    })

    context('quando o email já existe', function(){
        const user = {
            name: "Daniel Independente",
            email: "daniel@indepentente.com",
            password: "pwd123",
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('deve exibir email ja cadastrado', function() {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
           
        });
    })

    context('quando o email estiver incorreto', function(){
        const user = {
            name: "Elizabeth Olsen",
            email: "liza.yahoo.com",
            password: "pwd123"
        }

        it('deve exibir mensagem de alerta', function(){
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('quando o campo nome estiver incorreto', ()=>{
        const user = {
            
            email: "daniel@indep.com",
            password: "pwd123"
        }

        it('deve exibir mensagem de alerta nome obrigatorio', () =>{
            signupPage.go()
            signupPage.formInvalido(user)
            signupPage.submit()
            signupPage.alert.haveText('Nome é obrigatório')
        })
    })


    context('quando o campo password tiver menos do que seis caracteres', ()=>{
        const passwords = ['A', 'aB', 'Abc', 'AbCd', 'AbCdE']
        
        beforeEach(function(){
            signupPage.go()
        })

        passwords.forEach(function(p){
            it('não deve cadastrar com a senha: '+ p, function(){
                this.short_password.password = p
    
                signupPage.form(this.short_password)
                signupPage.submit()
                
            })
        })

        afterEach(function(){
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })
        
    }) 

    context('quando não preencho nenhum dos campos', () =>{
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória',
            'Nome é obrigatório'      
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase , () => {
                signupPage.alert.haveText(alert)
            });
        })
    })

})