var request = require('request');

module.exports = function(url,data,cb){
  var options = {
      method: 'POST',
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      uri: url,
      body:"data="+JSON.stringify(data),
      // json: true // Automatically stringifies the body to JSON
  };
  request(options,(err,res,body)=>cb(err,body));
};
