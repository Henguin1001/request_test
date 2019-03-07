var sendCommand = require('./src/sendCommand.js');
var postToServer = require('./src/postToServer.js');

sendCommand.bulk(["128.186.51.184"],500,function(err,res){
    postToServer("https://ptsv2.com/t/v9rla-1551917193/post",res,function(err){
      if(err) console.log(err);
    });
});
