const { query } = require("express");

class Messages {
    constructor(db) {
        this.db = db;
        this.db.loadDatabase();
    }

    add(user_id,date,text){
        return new Promise((resolve, reject) => {
            this.db.insert({user_id: user_id, date: date, text: text},function(err,res){
                if(err) reject(err);
                else resolve(res._id);
            })
        })
    }

    exisit(row_id){
        return new Promise((resolve, reject) => {
            this.db.find({_id: row_id},function(err,res){
                if(err) reject(err);
                else{
                    resolve(res.length);
                }
            })
        })
    }

    delete(row_id){
        return new Promise((resolve, reject) => {
            this.db.remove({_id: row_id},function(err){
                if(err) reject(err);
                else resolve();
            })
        })
    }

    getMessageID(user_id,text){
        return new Promise((resolve, reject) => {
            this.db.find({user_id: user_id, text: text},function(err,res){
                if(err) reject(err);
                else resolve(res[0]._id);
            })
        })
    }

    show(user_id){
        //this.db.loadDatabase();
        //collection.find({ runtime: { $lt: 15 } }, { sort: { title: 1 }, projection: { _id: 0, title: 1, imdb: 1 }});
        return new Promise((resolve, reject) => {
            this.db.find({user_id: user_id},function(err,res){
                if(err) reject(err);
                else resolve(res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
            })//.sort({created_at: -1})
        })
    }

    all(){
        //this.db.loadDatabase();
        return new Promise((resolve, reject) => {
            this.db.find({},function(err,res){
                if(err) reject(err);
                else resolve(res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
            })
        })
    }
}

exports.default = Messages;