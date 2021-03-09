// rappel de cours

const { default: app } = require('./app');


let sql = 'SELECT * FROM users';
db.all(sql); --> ResultSet --> forEach

let sql = 'SELECT * FROM users WHERE id_user=1';
db.get(sql); --> ligne --> ligne direct


var name = "toto"
let sql = 'SELECT * FROM users WHERE name = toto';
db.all(sql,[name],(err,rows)=>{
    if (err){
        console.log("erreur");
    }else{
        rows.forEach((row)=>{
            console.log(row);
            console.log(row.name);
        })
    }
});


// création des tables 
//0.7
CREATE TABLE IF NOT EXISTS users ( 
    login VARCHAR(512) NOT NULL PRIMARY KEY, 
    password VARCHAR(256) NOT NULL, 
    lastname VARCHAR(256) NOT NULL, 
    firstname VARCHAR(256) NOT NULL 
    )
    
    CREATE TABLE IF NOT EXISTS friends (
      from VARCHAR(512),
      to VARCHAR(512),
      timestamp TIMESTAMP,
      PRIMARY KEY (`from`,`to`)
    )
//0.8
    INSERT INTO users VALUES ("toto","toto","toto","toto");

// SQL et NodeJS
//0.9 
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory');
à mettre dans app.js

// 0.10 
dans le fichier app.js

// 0.11
class Users {
    constructor(db) {
      this.db = db
      this.db.exec("CREATE TABLE IF NOT EXISTS users (login VARCHAR(512) NOT NULL UNIQUE, password VARCHAR(256) NOT NULL, lastname VARCHAR(256) NOT NULL, firstname VARCHAR(256) NOT NULL )");
    }

    //0.12
    async exists(login){
        return new Promise((resolve,reject)=>{
            var sql = "SELECT login FROM users WHERE login = ?"
            db.get(sql,[login], function...)

            // ou 

            var stmt = db.prepare("SELECT login FROM users WHERE login = ?")
            stmt.get([login],function(err,res){
                if (err){
                    reject(err);
                }else{
                    resolve(res !== undefined);
                }
            })
        })
        
    }

    // 0.13
    create(login, password, lastname, firstname){
        let _this = this
        return new Promise( (resolve, reject) =>{
            var stmt = _this.db.prepare("INSERT INTO users VALUES (?,?,?,?)")
            stmt.run([login,password,lastname,firstname],function(err,res){
                if (err){
                    reject(err);
                }else{
                    resolve(this.lastID);
                }
            })
        })
    }
    
    //0.14
    async checkpassword (login, password){
        return new Promise((resolve,reject)=>{
            var stmt = db.prepare("SELECT rowid as user_id FROM users WHERE login = ? and password = ?")
            stmt.get([login, password],function(err,res){
                if (err){
                    reject(err);
                }else{
                    resolve(res.user_id);
                }
            })
        }) 
    }

    //0.15
    get(userid){
        return new Promise((resolve,reject)=>{
            var stmt = db.prepare("SELECT * FROM users WHERE rowid = ?")
            stmt.get([userid],function(err,res){
                if (err){
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        })
    }
