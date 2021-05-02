class Users {
  constructor(db) {
    this.db = db
    const req1 = `CREATE TABLE IF NOT EXISTS users ( 
      login VARCHAR(256) NOT NULL PRIMARY KEY, 
      password VARCHAR(256) NOT NULL, 
      lastname VARCHAR(256) NOT NULL, 
      firstname VARCHAR(256) NOT NULL 
      )`;
    
    this.db.exec(req1, (err) => {
      if (err) {
        throw err; 
      }
    });
  }

  create(login, password, lastname, firstname) {
    let _this = this
    return new Promise((resolve, reject) => {
      var req = _this.db.prepare("INSERT INTO users VALUES(?, ?, ?, ?)");
      req.run([login, password, lastname, firstname], function(err) {
        if (err) reject();
        else resolve(this.lastID);
      });
    });
  }

  get(userid) {
    return new Promise((resolve, reject) => {
      var stmt = this.db.prepare("SELECT * FROM users WHERE rowid = ?")
      stmt.get([userid],function(err,res){
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  getByLogin(login){
    return new Promise((resolve, reject) => {
        var stmt = this.db.prepare("SELECT *,rowid FROM users WHERE login = ?")
        stmt.get([login],function(err,res){
          if (err) reject(err);
          else resolve(res);
        });
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      var stmt = this.db.prepare( 'SELECT DISTINCT login FROM users WHERE login = ? ;');
      // get pour un seul
      stmt.get([login], (err, res) => {
        if (err) {
          reject(err);
        }
        else{ resolve(res !== undefined);}
      });
    });
  }

  async checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      var stmt = this.db.prepare("SELECT rowid as user_id FROM users WHERE login = ? and password = ?")
      stmt.get([login, password],function(err,res){
        if (err) reject(err);
        if (res === undefined) reject();
        else resolve(res.user_id);
      })
    })
  }
}

exports.default = Users;

