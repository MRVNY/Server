const express = require("express");
const Users = require("./entities/users.js");

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

    //router.put('/api/user').send(user)

    ////////LOGIN////////
    /*{
        "login": "pikachu",
        "password": "1234"
    }*/
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
                    message: "Requête invalide : login et password nécessaires"
                });
                return;
            }
            //if login doesn't exist
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
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
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(401).json({
                status: 401,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    })
    .delete(async (req, res) => {     //////////LOGOUT//////////
        user = await users.get(1) //1
        //console.log("USER "+req.session.userid)//??????
        req.session.destroy();
        res.status(200).json({
            status: 200,
            message: user+" logged out"
        });
        return;
    });

    ////////GET AND DELETE USER////////
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
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

    
    ////////ADD USER////////
    /*{
    "login": "pikachu",
    "password": "1234",
    "lastname": "chu",
    "firstname": "pika"
    }*/
    router.put("/user", (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    return router;
}

exports.default = init;

