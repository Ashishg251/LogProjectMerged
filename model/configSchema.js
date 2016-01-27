var mongoose = require('mongoose');
mongoose.createConnection('mongodb://172.23.238.253:27018/LogAggregate');
// mongoose.connect('mongodb://localhost/LogAggregate');

var Schema = mongoose.Schema;
var configSchema = new Schema({
  years:Object,
  months:Object,
  modes:Object
});
var Config = mongoose.model('Config', configSchema,'ConfigData');
module.exports = Config;
