var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var logSchema = new Schema({
  // date:Number,
  // month:String,
  // year:Number,
  // time:String,
  timestamp:String,
  mode:String,
  size:Number,
  source_ip:String,
  download:String
},{collection: "aptcache"});

module.exports = logSchema;
