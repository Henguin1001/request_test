const MongoClient = require('mongodb').MongoClient;

class DBHandler {
  constructor(username, password, db, collection) {
    this.db = db;
    this.collection = collection;
    const uri = "mongodb+srv://"+username+":"+ password +"@cluster0-qwocw.mongodb.net/"+db+"?retryWrites=true";
    this.client = new MongoClient(uri, { useNewUrlParser: true });
  }
  connect(cb){
    this.client.connect(cb);
  }
  disconnect(){
    this.client.close();
  }
  postData(data,cb){
      data.access_time = new Date();
      const collection = this.client.db(this.db).collection(this.collection);
      collection.insertMany(data, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        cb(err,res);
      });
  }
  getData(cb){
    const collection = this.client.db(this.db).collection(this.collection);
    collection.find({}).toArray(function(err, result) {
      if (err) throw err;
      cb(err, result);
    });
  }
  getRecentData(limit, cb){
    const collection = this.client.db(this.db).collection(this.collection);
    collection.find({}).sort({_id:1}).limit(limit).toArray(function(err, result) {
      if (err) throw err;
      cb(err, result);
    });
  }
  removeOld(cb){
    var date = new Date();
    date.setDate(date.getDate() - 1);
    const collection = this.client.db(this.db).collection(this.collection);
    collection.remove( { access_time : {"$lt" : date} },cb)
  }
}
module.exports = DBHandler;
// var creds = require('../credentials.secret.json');
// var d = new DBHandler(creds.username,creds.password,"test","devices");
// d.connect(err=>{
//   // if(!err){
//   //   d.postData({info:"some new data"},err=>{
//   //     d.disconnect();
//   //   })
//   // }
//   d.getData((err,res)=>{
//     console.log(res);
//     d.disconnect();
//   });
// })
