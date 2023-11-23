const { db } = require("./config");

exports.connectDatabase = ()=> {
      db.connect((err) => {
        if (err) {
          console.log('Error connecting to MySQL: ' + err);
        } else {
          console.log('Connected to MySQL');
        }
      });
}
