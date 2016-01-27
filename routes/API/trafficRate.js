var express = require('express');
var path = require('path');
var router = express.Router();
var Log = require('mongoose').model('Logs');

/* GET home page. */
router.get('/:year/:month', function(req, res, next) {

  var year = req.params.year;
  var month = req.params.month;
  var fromDate, toDate;
  if(month == "0") {
    fromDate = new Date(year, 0);
    toDate = new Date(parseInt(year)+1, 0);
  } else {
    fromDate = new Date(year, parseInt(month)-1);
    toDate = new Date(year, parseInt(month));
  }
  var finalData = [];
  var accumulator = {};
  var dates = {};
  Log.find({time : {"$gte": fromDate, "$lt": toDate}}, 'method time', function(err, serverHits) {
    for(i in serverHits)
    {
      var obj = {};
      day_date = (serverHits[i].time).toISOString().substring(0, 10);
      if(dates[day_date])
      {
        accumulator[day_date][serverHits[i].method]+= 1;
      }
      else
      {
        dates[day_date] = 1;
        obj.date = day_date;
        obj.GET = 0;
        obj.POST = 0;
        obj.OPTIONS = 0;
        obj.HEAD = 0;
        obj[serverHits[i].method] = 1;
        accumulator[day_date] = obj;
      }
    }

    finalData.push(dates);
    finalData.push(accumulator);
    res.json(finalData);
  });
});
module.exports = router;
