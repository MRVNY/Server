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
    const friends = new Friends.default(db);
    const users = new Users.default(db);

    //FOLLOW 
    router
        .route("/user/:user_id(\\d+)")
        .put(async (req, res) => {
            try{
                const { following } = req.body;
                login = (await users.get(req.params.user_id)).login;
                if (!following || ! await users.exists(login) || ! await users.exists(following)) {
                    res.status(400).send("User or user to follow unknown");
                } else {
                    if(! await friends.isFollowing(login,following)){
                        reso = await friends.follow(login, following)
                        if( reso != 0){
                            if(await friends.isFollowing(login,following))
                                res.status(201).send(`${login} is now following ${following}`);
                            else res.status(400).send("Unsucessful")
                        }
                        else res.sendStatus(404)
                    }
                    else res.status(400).send("Already following")
                }
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
    //UNFOLLOW
        .delete((req, res) => {}) //TODO


    //SHOW FOLLOWERS
    router
        .get("/user/:user_id(\\d+)/followers", async (req,res) => {
            login = (await users.get(req.params.user_id)).login;
            console.log("Login: ",login)
            if (! await users.exists(login)) res.status(400).send("User unknown");
            else {
                list = await friends.getFollowers(login);
                console.log("Followers: "+list);
                res.status(200).send(list);
            }
        })

    //SHOW FOLLOWINGS
    router
        .get("/user/:user_id(\\d+)/followings", (req,res) => {}) //TODO



    return router;
}

exports.default = init;

