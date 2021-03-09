var Datastore = require('nedb')
db = new Datastore()

db.find()

db={}
db.users = new Datastore()
db.robots = new Datastore()

db.users.loadDatabase()
db.robots.loadDatabase()

db.users.find()

i = {author_id:"158", author_name: "pika", date: new Date(), text:"yoyoyo"}

db.insert(i);

//0.6
db.find({},function(err,doc){
    console.log(doc);
})

//0.7
db.find({},{author_id:1, _id:1},function(err,doc){
    console.log(doc);
})

//0.8
db.find({author_id:"158"},{author_id:1, _id:1},function(err,doc){
    console.log(doc);
})

//0.9
const getDocumentID = function(authorID,textM){
    return new Promise((resolve,reject)=>{
        db.find({author_id:authorID, text:textM},{_id:1,author_id:1})
        ,function(err,docs){
            if(err) reject(err);
            else resolve(docs[0]._id);
        }
    })
}

getDocumentID("158","yoyoyo").then((id))

//0.11
db.find({date:{$gt:new Date(Date.now - 60*60*1000)}}
,function(err,docs){
    console.log(docs);
});

//0.12
db.find({author_id:{$in:[158,159]}}
,function(err,docs){
    console.log(docs);
});

//0.13