class Users {
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
    const req1 = "CREATE TABLE IF NOT EXISTS users (login VARCHAR(512) NOT NULL PRIMARY KEY, password VARCHAR(256) NOT NULL, lastname VARCHAR(256) NOT NULL, firstname VARCHAR(256) NOT NULL);";
    //this.db.run(req1);
    
    this.db.exec(req1, (err) => {
      if (err) {
        throw err; 
      }
    });
  }

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare('INSERT INTO users VALUES(?, ?, ?, ?);');
      req.run([login, password, lastname, firstname], (err) => {
        if (err) { reject();}
        else{ resolve(this.db.lastrowid) }
      });
    });
  }

  get(userid) {
    return new Promise((resolve, reject) => {
      req = 'SELECT DISTINCT login FROM users WHERE rowid = ? ;';
      // get pour un seul
      req.get([userid], (err, res) => {
        if (err) {
          reject();
        }
        else{ resolve(res !== undefined);}
      });
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      req = 'SELECT DISTINCT login FROM users WHERE login = ? ;';
      // get pour un seul
      req.get([login,password], (err, res) => {
        if (err) {
          reject();
        }
        else{ resolve(res !== undefined);}
      });
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      req = 'SELECT DISTINCT login FROM users WHERE login = ? and password = ?;';
      // get pour un seul
      this.db.get(req, [login,password], (err, res) => {
        if (err) {
          reject();
        }
        else{ resolve(res != null);}
      });
    });
  }
}

exports.default = Users;

