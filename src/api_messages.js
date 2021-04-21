const express = require("express");
const Messages = require("./entities/messages.js");
const Users = require("./entities/users.js");

function init(db,nedb) {
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
    const msg = new Messages.default(nedb);
    const users = new Users.default(db);

    //postMessage
    router
        .route("/user/:user_id(\\d+)/messages")
        .put(async (req, res) => {
            try{
                const { text } = req.body;
                
                login = (await users.get(req.params.user_id)).login;
                if(! await users.exists(login)) res.status(400).send("User unknown");
                else if(text=="") res.status(400).send("Message unknown");
                else {
                    id = await msg.add(login, new Date(), text)

                    if(await msg.exisit(id))
                        res.status(201).send(`Message ${id} posted`);
                    else res.status(400).send("Unsucessful")
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

    //deleteMessage
    .delete(async(req,res) => {
        try{
            const { msg_id } = req.body;
            
            if(! await msg.exisit(msg_id)) res.status(400).send("Message unknown");
            else{
                await msg.delete(msg_id);

                if(! await msg.exisit(msg_id))
                    res.status(201).send(`Message ${msg_id} deleted`);
                else res.status(400).send("Unsucessful")
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
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    })

    return router;
}

exports.default = init;