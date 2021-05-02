const express = require("express");
const Users = require("./entities/users.js");

function init(db) {
    const router = express.Router();
    router.use(express.json());
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const users = new Users.default(db);

    ////////LOGIN////////
    router
    .route("/user/login")
    .post(async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            //no login or no pwd
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    message: "Login and/or password missing"
                });
                return;
            }
            //if login doesn't exist
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Login and/or password incorrect"
                });
                return;
            }
            //check pwd
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Internal error"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login and/or password accepted",
                            id: userid
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(401).json({
                status: 401,
                message: "Login and/or password incorrect"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "Internal error",
                details: (e || "Unknown error").toString()
            });
        }
    })

    ////////GET USER////////
    router
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete(async (req, res) => {
            try{
                user = await users.get(req.params.user_id)
                if(!user) res.status(400).send("User doesn't exists");
                else if(req.params.user_id != req.session.userid) res.status(400).send("User not correspondent with session");
                else{
                    req.session.destroy();
                    res.status(200).json({
                        status: 200,
                        message: `${user.login} loggged out`
                    })
                }
                return;
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    message: "Internal error",
                    details: (e || "Unknown error").toString()
                });
            }
        });

    
    ////////ADD USER////////
    /*{
    "login": "pikachu",
    "password": "1234",
    "lastname": "chu",
    "firstname": "pika"
    }*/
    router.put("/user", async (req, res) => {
        try{
            const { login, password, lastname, firstname } = req.body;
            if (!login || !password || !lastname || !firstname) {
                res.status(400).send("Missing field(s)");
            }
            else if(await users.exists(login)) res.status(400).send("User already exists");
            else {
                users.create(login, password, lastname, firstname)
                    .then((user_id) => res.status(201).send({ id: user_id }))
                    .catch((err) => res.status(500).send(err));
            }
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "Internal error",
                details: (e || "Unknown error").toString()
            });
        }
    });

    ///////SEARCH////////
    router
    .route("/user/search/:login")
    .get(async (req, res) => {
        try {
            login = req.params.login
            const user = await users.getByLogin(login);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).json({
                status: 500,
                message: "Internal error",
                details: (e || "Unknown error").toString()
            });
        }
    })

    return router;
}

exports.default = init;

