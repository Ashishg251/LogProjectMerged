var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var logSchema = new Schema({
  remote : String,
  host : String,
  user : String,
  method : String,
  path : String,
  code : Number,
  size : String,
  referer : String,
  agent : String,
  time : Date
},{collection: "logs"})//changed from serverhits

mongoose.model('Logs', logSchema);
