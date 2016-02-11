var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var logSchema = new Schema({
  timestamp:String,
  mode:String,
  size:Number,
  host:String,
  path:String
},{collection: "aptcache"});

module.exports = logSchema;
