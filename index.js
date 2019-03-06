var sendCommand = require('./src/sendCommand.js');
sendCommand.bulk(["12312313","12312312"],500,function(err,res){
  console.log(res);
});
