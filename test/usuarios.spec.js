const app = require('../bin/www');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const base_url = 'http://localhost:3085'

chai.use(chaiHttp);

describe('Teste login API', () => {
    let usuario = {
        nome: 'Lais Graziele',
        cpf: '1115522333116',
        senha: 'asd456',

    }

    let token = '';

    it('Deveria criar um novo usuario', (done) => {
        chai.request(base_url)
            .post('/signup')
            .send(usuario)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('usuario')
                expect(res.body.usuario).to.not.be.null
                done()
            });
    });

    it('Não deveria criar um usuario existente', (done) => {
        chai.request(base_url)
            .post('/signup')
            .send(usuario)
            .end((err, res) => {
                expect(res).to.have.status(500)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('error')
                done()
            });
    });

    it('Não deve fazer login com um usuario não existente', (done) => {
        chai.request(base_url)
            .post('/login')
            .send({ cpf: '15156544878', senha: '123456' })
            .end((err, res) => {
                expect(res).to.have.status(401)
                expect(res.body).to.be.a('object')
                done()
            });
    });

    it('Fazer login com usuario', (done) => {
        chai.request(base_url)
            .post('/login')
            .send({ cpf: usuario.cpf, senha: usuario.senha })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('token')
                expect(res.body.token).to.be.a('string')
                expect(res.body.contact).to.not.be.null
                token = res.body.token;
                done()
            });
    });

    it('Logout executado', (done) => {
        chai.request(base_url)
            .post('/logout')
            .set('authorization', 'Bearer ' + token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('msg')
                done()
            })
    });

    it('Não fazer logout sem token', (done) => {
        chai.request(base_url)
            .post('/logout')
            .end((err, res) => {
                expect(res).to.have.status(401)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('msg')
                done()
            })
    });


    after(done => {
        let usuario = require('../models/Usuario');
        usuario.remove({ cpf: '1115522333116' })
            .then(ok => {
                console.log('Apagou todos os usuários');
                done();
            })
            .catch(err => {
                console.log('Não apagou os usuarios.');
                done(err);
            })
    });

});