var sendCommand = require('./src/sendCommand.js');
var postToServer = require('./src/postToServer.js');
var DBHandler = require('./src/mongo.js');

var credentials = require('./credentials.secret.json');

var dbh = new DBHandler(credentials.username,credentials.password,"test","prints");
dbh.connect(err=>{
  dbh.getData((err,res)=>{
    console.log(res);
    dbh.disconnect();
  });
});
