var Log = require('mongoose').model('Logs');
var express = require('express');
var router = express.Router();

router.get('/:showBy/:year/:month', function(req, res, next) {
  var year = req.params.year;
  var month = req.params.month;
  var showBy = req.params.showBy;
  var fromDate, toDate;

  var response = {};
  if(month == "0") {
    fromDate = new Date(year, 0);
    toDate = new Date(parseInt(year)+1, 0);
  } else {
    fromDate = new Date(year, parseInt(month)-1);
    toDate = new Date(year, parseInt(month));
  }
  Log.find({time : {"$gte": fromDate, "$lt": toDate}}, 'agent', function(err, serverHits) {
    var reqData = [];
    var getFilter = function (agent) {
      for(var i = 0, len = config.userAgentFilters[showBy].length; i < len; i++) {
        if(agent.indexOf(config.userAgentFilters[showBy][i]["types"], 0) != -1) {
          return config.userAgentFilters[showBy][i]["names"];
        }
      }
      return "Others";
    }

    for(var i = 0, len = serverHits.length; i < len ; i++) {
      var filter = getFilter(serverHits[i].agent);
      if(response[filter] == undefined)
          response[filter] = 0;
      response[filter]+=1;
    }
    res.json(response)
  });
});

module.exports = router;
