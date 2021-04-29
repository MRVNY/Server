class Friends {
  constructor(db) {
    this.db = db
    const req1 = `CREATE TABLE IF NOT EXISTS friends ( 
      user VARCHAR(256) NOT NULL, 
      following VARCHAR(256) NOT NULL
      )`;
    
    this.db.exec(req1, (err) => {
      if (err) {
        throw err; 
      }
    });
    this.db.exec(`INSERT INTO friends VALUES("pika","eevee")`)
  }

  follow(user,following) {
    let _this = this
    return new Promise((resolve, reject) => {
      var req = _this.db.prepare(`INSERT INTO friends VALUES(?, ?)`);
      req.run([user,following], function(err) {
        if (err) reject();
        else resolve(this.lastID);
      });
    });
  }

  unfollow(user,following) {
    return new Promise((resolve, reject) => {
      var req = this.db.prepare(`DELETE FROM friends WHERE user = ? AND following = ?`);
      req.run([user,following], function(err) {
        if (err) reject();
        else resolve(true);
      });
    });
  }

  isFollowing(user,following) {
    return new Promise((resolve, reject) => {
      var req = this.db.prepare(`SELECT DISTINCT * FROM friends WHERE user = ? AND following = ?`);
      req.get([user,following], function(err,res) {
        if (err) reject(err);
        else resolve(res !== undefined);
      });
    });
  }

  getFollowers(following) {
    return new Promise((resolve, reject) => {
      //var req = this.db.prepare(`SELECT * FROM friends`);
      var req = this.db.prepare(`SELECT DISTINCT user FROM friends WHERE following = ?`);
      req.all([following], function(err,res) {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  getFollowings(user) {
    return new Promise((resolve, reject) => {
      var req = this.db.prepare(`SELECT DISTINCT following FROM friends WHERE user = ? `);
      req.all([user], function(err,res) {
        if (err) reject();
        else resolve(res);
      });
    });
  }
}

exports.default = Friends;
