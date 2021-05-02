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
        .route("/user/:user_id(\\d+)/follow")
        .put(async (req, res) => {
            try{
                const { followingID } = req.body;
                following = (await users.get(followingID)).login;
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
        .delete(async (req, res) => {
            try{
                const { followingID } = req.body;
                if(followingID) following = (await users.get(followingID)).login;
                login = (await users.get(req.params.user_id)).login;
                if (!following || ! await users.exists(login) || ! await users.exists(following)) {
                    res.status(400).send("User or user to unfollow unknown");
                } else {
                    if(await friends.isFollowing(login,following)){
                        reso = await friends.unfollow(login, following)
                        if( reso != 0){
                            if(!await friends.isFollowing(login,following))
                                res.status(201).send(`${login} unfollowed ${following}`);
                            else res.status(400).send("Unsucessful")
                        }
                        else res.sendStatus(404)
                    }
                    else res.status(400).send("Already not following")
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


    //SHOW FOLLOWERS
    router
        .get("/user/:user_id(\\d+)/followers", async (req,res) => {
            try{
                login = (await users.get(req.params.user_id)).login;
                if (! await users.exists(login)) res.status(400).send("User unknown");
                else {
                    await friends.getFollowers(login)
                    .then(async (list) => {
                        res.status(200).send(list);
                    })
                    
                }
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    message: "Internal error",
                    details: (e || "Unknown error").toString()
                });
            }
        })

    // SHOW FOLLOWINGS 
    router
        .get("/user/:user_id(\\d+)/followings", async (req,res) => {
            try{
                login = (await users.get(req.params.user_id)).login;
                if (! await users.exists(login)) res.status(400).send("User unknown");
                else {
                    list = await friends.getFollowings(login);
                    /*out=[]
                    for(i=0;i<list.length;i++){
                        out.push(await users.getByLogin(list[i].user))
                    }*/
                    res.status(200).send(list);
                }
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    message: "Internal error",
                    details: (e || "Unknown error").toString()
                });
            }
        })


        //CHECK IF FOLLOWING
        router
        .get("/user/:user_id(\\d+)/followings/:toCheck", async (req,res) => {
            try{
                const toCheck= (await users.get(req.params.toCheck)).login
                const login = (await users.get(req.params.user_id)).login;
                const ifFollowing = await friends.isFollowing(login,toCheck)
                res.status(200).send(ifFollowing)
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

