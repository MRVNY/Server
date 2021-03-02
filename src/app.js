const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

//Connexion à la BD
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks"
}));

app.use('/api', api.default(db));

// Démarre le serveur
app.on('close', () => {
    //fermer la BD
    db.close();
});
exports.default = app;

