
//0.3
// une seule collection dans ma db
var Datastore = require('nedb');
db = new Datastore();



// plusieurs collections
//db ={}
//db.messages= new Datastore();
//db.robots = new Datastore();

//db.messages.loadDatabase();
//db.robots.loadDatabase();


//0.4
i = {author_id: "158", author_name: "machin",
 date: new Date(), text: "Voila le texte du comentaire"};
j = {author_id: "159", author_name: "machin",
 date: new Date(), text: "Voila le texte du comentaire", 
 like : 
 [
    {author_id : 123, text : "fdskfjdsk"}, 
    {author_id:432768,text : "fdksfld"}
]};

//0.5
db.insert(i);
db.insert(j); 
// ou 
//db.messages.insert(i);

// 0.6
db.find({}, function(err,docs){
    //console.log(docs);
})

// 0.7
db.find({},{author_id:1, _id:1}, function(err,docs){
    //console.log(docs);
})

//0.8
db.find({author_id : "158"},{author_id:1, _id:1}, function(err,docs){
    //console.log(docs);
})

//0.9 - il y a une erreur ici, prendre le code de testndb.js
const getDocumentID = function(authorID,textM){
    console.log("test");
    return new Promise((resolve, reject)=>{
        db.find({author_id : authorID,text:textM}
            ,{_id:1,author_id:1})
            ,function(err,docs){
                if (err){
                    console.log("err");
                    reject(err);
                }else{   
                    console.log(docs[0]._id);
                    id = docs[0]._id;
                    resolve(id);
                }
            };

    });
};

//0.10
getDocumentID("158","Voila le texte du comentaire")
.then((id)=>{
    console.log("ici " + id);
    db.find({_id:id},{},function(err,docs){
        console.log(docs);
    })
});

db.find({author_id : "158",text:"Voila le texte du comentaire"}
    ,{_id:1,author_id:1},function(err,docs){
        console.log(docs);
    });

//0.11
db.find({date:{$gt:new Date(Date.now() - 60*60*1000)}}
,function(err,docs){
    console.log(docs);
});

//0.12
db.find({author_id:{$in:[158,159]}}
,function(err,docs){
    console.log(docs);
});


//0.13
// - chercher les amis de l'utilisateur 256 (sqlite)
// - interroger mongodb pour récupérer les messages écrits 
// par les utilisateurs récupérés sous sqlite
