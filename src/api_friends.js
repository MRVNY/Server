const express = require("express");
const Users = require("./entities/users.js");
const Friends = require("./entities/friends.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const users = new Users.default(db);
    const friends = new Friends.default(db);

    //router.put('/api/user').send(user)


    //FOLLOW 
    router
        .route("/user/:user_id(\\d+)")
        .put((req, res) => {
            const { following } = req.body;
            if (!following || !users.exists(req.params.user_id)) {
                res.status(400).send("User or user to follow unknown");
            } else {
                if(friends.follow(req.params.user_id, following)){
                    res.status(200),send(req.params.user_id, " is now following ", following);
                }
                else res.sendStatus(404)
            }
        })
        //UNFOLLOW
        .delete((req, res) => {}) //TODO

    return router;
}

exports.default = init;

