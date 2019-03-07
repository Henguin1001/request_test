/*

/command
`POST /command HTTP/1.1
Accept: application/json, text/javascript, /; q=0.01
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

GETPRINTERSTATUS=`

return value: Current printer status
example return:
{ "buildPlate_target_temperature":80, "chamber_temperature":38, "door_open":0, "elaspedtime":7617, "error_code":200, "extruder_target_temperature":255, "fanSpeed":0, "filament_type":"NYLON", "firmware_version":"v3.0_R02.03.04", "jobname":"", "jobstatus":"building", "layer":50, "message":"success", "networkBuild":1, "platform_temperature":80, "progress":41.799999999999997, "remaining":5338, "status":"busy", "temperature":252, "totalTime":10090 }

*/


var request = require('request');
var async = require('async');
function single(ip_address,cb){
  var url = 'http://'+ip_address+'/command';
  var options = {
      method: 'POST',
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      uri: url,
      body:"GETPRINTERSTATUS=true"
      // json: true // Automatically stringifies the body to JSON
  };
  request(options,(err,res,body)=>cb(err,body));
}
function bulk(ip_addresses,rate,cb){
  async.mapSeries(ip_addresses,function iterator(ip_address,icb){
    setTimeout(single, rate, ip_address,icb);
  },cb)
}
function bulkPrinter(printers, rate, cb){
  async.mapSeries(printers,function iterator(printer,icb){
    setTimeout(single, rate, printer.ip_address, function(err,body){
      if(err){
        printer.found = false;
        icb(null,printer);
      } else {
        printer.found = true;
        printer.body = body;
        icb(err,printer);
      }
    });
  },cb);
}

module.exports = {single:single,bulk:bulk,bulkPrinter:bulkPrinter};
