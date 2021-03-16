class Friends {
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
    const req1 = `CREATE TABLE IF NOT EXISTS friends ( 
      user VARCHAR(512) NOT NULL PRIMARY KEY, 
      following VARCHAR(256) NOT NULL
      )`;
    //this.db.run(req1);
    
    this.db.exec(req1, (err) => {
      if (err) {
        throw err; 
      }
    });
  }

  follow(user,following) {
      let _this = this
      return new Promise((resolve, reject) => {
        var req = _this.db.prepare("INSERT INTO friends VALUES(?, ?)");
        req.run([user,following], function(err) {
          if (err) reject();
          else resolve(true);
        });
      });
  }

  unfollow(user,following) {
    let _this = this
    return new Promise((resolve, reject) => {
      var req = _this.db.prepare("DELETE FROM friends WHERE user = ? AND following = ?");
      req.run([user,following], function(err) {
        if (err) reject();
        else resolve(true);
      });
    });
  }

  isFollowing(user,following) {
    let _this = this
    return new Promise((resolve, reject) => {
      var req = _this.db.prepare("SELECT DISTINCT * FROM friends WHERE user = ? AND following = ?");
      req.run([user,following], function(err) {
        if (err) reject();
        else resolve(res !== undefined);
      });
    });
  }
}