const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../Server/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de LOGOUT", () => {
    mocha.it("logout", (done) => {
        const request = chai.request(app.default).keepOpen();
        const user = {
            login: "pikachuu",
            password: "1234",
            lastname: "chu",
            firstname: "pika"
        };

        request
            .put('/api/user')
            .send(user)

            .then((res) => {
                res.should.have.status(201);
                console.log(`Retrieving user ${res.body.id}`)
                return Promise.all([
                    request
                        .get(`/api/user/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body, user)
                        }),
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })

        request
            .post('/api/user/login')
            .send({"login": "pikachuu","password": "1234"})

            .then((res) =>{ 
                res.should.have.status(200)
                console.log("MESSAGE:"+res.status)
            })

            .finally(() => {
                request.close()
            })

        request
            .delete('/api/user/1')
            
            .then((res) =>{
                res.should.have.status(200)
            })

            .finally(() => {
                request.close()
            })

    })
})

