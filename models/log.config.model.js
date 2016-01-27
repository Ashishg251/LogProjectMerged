var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var LogConfigSchema = new Schema({
  noOfYears : Number,
  paths : Number,
  listingLimit : Number,
  userAgentFilters : {
    browser : [{
      types : String,
      names : String
    }],
    os : [{
      types : String,
      names : String
    }]
  },
  refreshInterval: Number
},{collection: "log_config"})

mongoose.model('Config', LogConfigSchema);
