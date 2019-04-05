var mongoose = require('mongoose');
var sendCommand = require('./src/sendCommand.js');

var credentials = require('./credentials.secret.json');
mongoose.connect("mongodb+srv://"+credentials.username+":"+ credentials.password +"@cluster0-qwocw.mongodb.net/"+db+"?retryWrites=true", {useNewUrlParser: true});

var printers = [
  {printer_num:"1",ip_address:"128.186.51.11"},
  {printer_num:"5",ip_address:"128.186.51.186"},
  {printer_num:"6",ip_address:"128.186.51.149"},
  {printer_num:"7",ip_address:"128.186.51.231"},
  {printer_num:"9",ip_address:"128.186.51.237"},
  {printer_num:"12",ip_address:"128.186.51.22"},
  {printer_num:"14",ip_address:"128.186.51.233"},
  {printer_num:"15",ip_address:"128.186.51.177"}
];

var printJobSchema = new mongoose.Schema({
  name: String,
  status: String,
  message: String,
  progress: Number,
  totalTime: Number
});
var printJob = mongoose.model('printJob', printJobSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    setInterval(function update(){
      sendCommand.bulkPrinter(printers,300,function(err,res){
        updateItem(res,function(err,res){
          if(err){
            throw err;
          }
        });
      });
    },10000);
    setInterval(function collect(){
    },100000);
});

function updateItem(res,cb){
  var obj = {
    name:res.jobname,
    status:res.jobstatus,
    message:res.message,
    progress:res.progress,
    totalTime:res.totalTime
  };
  var query = {'name':obj.name};
  printJob.findOneAndUpdate(query, obj, {upsert:true}, cb);
}
