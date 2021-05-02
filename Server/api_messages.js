const express = require("express");
const Messages = require("./entities/messages.js");
const Users = require("./entities/users.js");
const Friends = require("./entities/friends.js");

function init(db,nedb) {
    const router = express.Router();
    router.use(express.json());
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const friends = new Friends.default(db);
    const users = new Users.default(db);
    const msg = new Messages.default(nedb);

    //postMessage
    router
        .route("/user/:user_id(\\d+)/messages")
        .put(async (req, res) => {
            try{
                const { text } = req.body;
                
                login = (await users.get(req.params.user_id)).login;
                if(! await users.exists(login)) res.status(400).send("User unknown");
                else if(text==="") res.status(400).send("Empty message");
                else if(text.length>140) res.status(400).send("Message too long");
                else {
                    id = await msg.add(login, new Date(), text)

                    if(await msg.exisit(id))
                        res.status(201).send(`Message ${id} posted`);
                    else res.status(400).send("Unsucessful")
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

    //deleteMessage
    .delete(async(req,res) => {
        try{
            const { msg_id } = req.body;

            login = (await users.get(req.params.user_id)).login;
            if(! await users.exists(login)) res.status(400).send("User unknown");
            
            if(! await msg.exisit(msg_id)) res.status(400).send("Message unknown");
            else{
                await msg.delete(msg_id);

                if(! await msg.exisit(msg_id))
                    res.status(201).send(`Message ${msg_id} deleted`);
                else res.status(400).send("Unsucessful")
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

    //showMessages
    .get(async(req,res) => {
        try{            
            login = (await users.get(req.params.user_id)).login;
            if(! await users.exists(login)) res.status(400).send("User unknown");
            else{
                out = await msg.show(login);

                if(out !== undefined)
                    res.status(201).send(out);
                else res.status(400).send("Unsucessful")
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

    //Get all msg
    router
        .route("/user/messages")
        .get(async(req,res) => {
            try{            
                out = await msg.all();
    
                if(out !== undefined)
                    res.status(201).send(out);
                else res.status(400).send("Unsucessful")
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    message: "Internal error",
                    details: (e || "Unknown error").toString()
                });
            }
        })
    
    //Get feeds
    router
        .route("/user/:user_id(\\d+)/feeds")
        .get(async(req,res) => {
            try{
                login = (await users.get(req.params.user_id)).login;
                if(! await users.exists(login)) res.status(400).send("User unknown");
                else{
                    followings = await friends.getFollowings(login)
                    followings.push({following:login})
                    out = []

                    for(i=0;i<followings.length;i++){
                        out = out.concat(await msg.show(followings[i].following))
                    }
    
                    if(out !== undefined)
                        res.status(201).send(out.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                    else res.status(400).send("Unsucessful")
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

    return router;

    
}

exports.default = init;