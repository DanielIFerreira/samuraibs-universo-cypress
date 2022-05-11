//import faker from '@faker-js/faker';
import signupPage from '../support/pages/signup/index'
describe('cadastro', function () {

    context('quando o usuário é um novato', () => {
        //Objeto 
        const user = {
            name: "Daniel Ferreira",
            email: "daniel.i.ferreira@outlook.com",
            password: "pwd123"
        }

        before(function () {
            //Tarefa para dar roolback no banco e apagar o email cadastrado
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })


        it('deve cadastrar com sucesso', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        });
    })

    context('quando o email já existe', () => {
        const user = {
            name: "Daniel Independente",
            email: "daniel@indepentente.com",
            password: "pwd123",
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user

            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('deve exibir email ja cadastrado', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
           
        });
    })

    context('quando o email estiver incorreto', ()=>{
        const user = {
            name: "Elizabeth Olsen",
            email: "liza.yahoo.com",
            password: "pwd123"
        }

        it('deve exibir mensagem de alerta', () =>{
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
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
            signupPage.alertHaveText('Nome é obrigatório')
        })
    })


    context('quando o campo password tiver menos do que seis caracteres', ()=>{
        const passwords = ['A', 'aB', 'Abc', 'AbCd', 'AbCdE']
        
        beforeEach(function(){
            signupPage.go()
        })

        passwords.forEach(function(p){
            it('não deve cadastrar com a senha: '+ p, function(){
                const user = {
                    name: "Jose",
                    email: "jose@indep.com",
                    password: p
                }
    
                signupPage.form(user)
                signupPage.submit()
                
            })
        })

        afterEach(function(){
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
        
    }) 

})