const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de Friends", () => {
    mocha.it("user", (done) => {
        const request = chai.request(app.default).keepOpen();
        
        const user1 = {
            login: "pikachuu",
            password: "1234",
            lastname: "chu",
            firstname: "pika"
        };
        const user2 = {
            login: "eevee",
            password: "4321",
            lastname: "ee",
            firstname: "vee"
        };

        request
            .put('/api/user')
            .send(user1)
            .put('/api/user')
            .send(user2)

            .then((res) => {
                res.should.have.status(201);
                console.log(`Retrieving user ${res.body.id}`)
                return Promise.all([
                    request
                        .get(`/api/user/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body, user1)
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
            .delete('/api/user/login')
            
            .then((res) =>{
                res.should.have.status(200)
            })
            .finally(() => {
                request.close()
            })

    })
})

