var sendCommand = require('./src/sendCommand.js');
var postToServer = require('./src/postToServer.js');
var DBHandler = require('./src/mongo.js');

var credentials = require('./credentials.secret.json');
var printers = [
  {id:"1",ip_address:"128.186.51.11"},
  {id:"5",ip_address:"128.186.51.186"},
  // {id:"6",ip_address:"128.186.51.149"},
  // {id:"7",ip_address:"128.186.51.231"},
  // {id:"9",ip_address:"128.186.51.237"},
  // {id:"12",ip_address:"128.186.51.22"},
  // {id:"14",ip_address:"128.186.51.233"},
  // {id:"15",ip_address:"128.186.51.177"}
];
var dbh = new DBHandler(credentials.username,credentials.password,"test","prints");
dbh.connect(err=>{
  if(!err) sendCommand.bulkPrinter(printers,500,function(err,res){
    dbh.postData(res, err=>{
      if(err) console.error(err);
      dbh.disconnect();
    });
  });
});
