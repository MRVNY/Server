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
        return new Promise((resolve, reject) => {
            this.db.find({user_id: user_id},function(err,res){
                if(err) reject(err);
                else resolve(res);
            })
        })
    }
}

exports.default = Messages;