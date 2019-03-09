var sendCommand = require('./src/sendCommand.js');
var postToServer = require('./src/postToServer.js');
var DBHandler = require('./src/mongo.js');

var credentials = require('./credentials.secret.json');
var printers = [
  {id:"1",ip_address:"128.186.51.11"},
  {id:"5",ip_address:"128.186.51.186"},
  {id:"6",ip_address:"128.186.51.149"},
  {id:"7",ip_address:"128.186.51.231"},
  {id:"9",ip_address:"128.186.51.237"},
  {id:"12",ip_address:"128.186.51.22"},
  {id:"14",ip_address:"128.186.51.233"},
  {id:"15",ip_address:"128.186.51.177"}
];
var dbh = new DBHandler(credentials.username,credentials.password,"test","prints");
dbh.connect(err=>{
  if(!err) {
    setInterval(function update(){
      sendCommand.bulkPrinter(printers,300,function(err,res){
        console.log(res);
        dbh.postData(res, err=>{
          if(err) console.error(err);
        });
      });
    },10000);
    setInterval(function collect(){
      dbh.removeOld()
    },100000);
  } else {
    throw err;
  }
});

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    dbh.disconnect();
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
