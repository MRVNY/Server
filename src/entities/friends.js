class Friends {
    constructor(db) {
      this.db = db
      // suite plus tard avec la BD
      const req1 = `CREATE TABLE IF NOT EXISTS friends ( 
        user VARCHAR(512) NOT NULL PRIMARY KEY, 
        follower VARCHAR(256) NOT NULL
        )`;
      //this.db.run(req1);
      
      this.db.exec(req1, (err) => {
        if (err) {
          throw err; 
        }
      });
    }

    add(login, password, lastname, firstname) {
        let _this = this
        return new Promise((resolve, reject) => {
          var req = _this.db.prepare("INSERT INTO users VALUES(?, ?, ?, ?)");
          req.run([login, password, lastname, firstname], function(err) {
            if (err) reject();
            else resolve(this.lastID);
          });
        });
    }

    delete(login, password, lastname, firstname) {
        let _this = this
        return new Promise((resolve, reject) => {
          var req = _this.db.prepare("INSERT INTO users VALUES(?, ?, ?, ?)");
          req.run([login, password, lastname, firstname], function(err) {
            if (err) reject();
            else resolve(this.lastID);
          });
        });
    }
}