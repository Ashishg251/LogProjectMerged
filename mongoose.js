var mongoose = require('mongoose');

module.exports = function() {
  var dbName = 'mongodb://172.23.238.253:27018/nginx'
 //var dbName = 'mongodb://localhost/sampleData'
  var db = mongoose.connect(dbName);

  require('./models/log.server.model');
  require('./models/log.config.model');
  require('./models/log.user.model');

  return db;
}
