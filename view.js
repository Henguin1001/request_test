var mongoose = require('mongoose');
var credentials = require('./credentials.secret.json');
mongoose.connect("mongodb+srv://"+credentials.username+":"+ credentials.password +"@cluster0-qwocw.mongodb.net/"+db+"?retryWrites=true", {useNewUrlParser: true});

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
  printJob.find(function (err, jobs) {
    if (err) return console.error(err);
    console.log(jobs);
  })
});
