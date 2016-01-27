var Config = require('mongoose').model('Config');
config = {};
Config.find({},{'_id': 0},function(err, data) {
  config = data[0];
});
