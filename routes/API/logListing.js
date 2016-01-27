var Log = require('mongoose').model('Logs');
var express = require('express');
var router = express.Router();

/*----------Response for All data and particular path data-------------------------------------*/

router.get('/:pathId/:pgno', function(req, res) {
  temp = req.params.pathId;
  pgno = req.params.pgno;
  limit = config.listingLimit;
  var counts = 0;
  skip = pgno > 1 ? ((pgno-1) * limit) : 0;
  if(temp == "All") {
    Log.count({}, function(er,c) {
      counts=c;
    });


    Log.find({}, 'remote host path user method code size referer agent time', {skip : skip,limit : limit,sort:{time: -1} }, function(err, serverhits) {
      var obj = {
        "collection_data" : serverhits,
        "count" : counts
      };
      obj.collection_data.sort(function(a, b) {
        return (b.time-a.time);
      });
      res.send(obj);
    });//close find
  }//close if

/*----------Response for particular path data----------------------------------------------*/

   else{
      if(temp != "$"){
      newtemp = decodeURIComponent(temp);
      newtemp = newtemp.replace(/ /g , "%20");
      var paths = "/" + newtemp;
      }
      else {
      paths = "/";
      }
      Log.count({path:paths},function(er,c){
          counts = c;
      });
      Log.find({path : paths},'remote host path user method code size referer agent time',{skip : skip, limit : limit,sort:{time: -1} }, function(err,serverhits) {
          var obj = {"collection_data" : serverhits,
                    "count" : counts
                  };
          obj.collection_data.sort(function(a, b) {
              return (b.time-a.time);
          });

      res.send(obj);
      });
  }//close else

});

/*-------------Response for path and count object--------------------------------------------------------*/

router.get('/', function(req, res  ) {

  Log.find({}, 'remote host path user method code size referer agent time', function(err, serverhits) {


        var obj = serverhits;
        final = {
         arr : []
         };
         var l = obj.length;
         var index = function(value,array) {
             for( var i = 0; i < array.length; i++){
                 if( array[i].path === value)
                     return i;
             }//close for
             return "null";
         }//close function index
         p = final.arr;
         for(var i = 0; i < l; i++){
            var value = obj[i].path;
            if(index(value,p) === "null")
             {
                 p.push( {
                   "path" : obj[i].path,
                   "count" : 1
                 });
             }
             else {
                     var k = index(value,p);
                     p[k].count +=  1;
             }
         }//close for

         p.sort(function(a, b) {
             return b.count-a.count;
         });

    res.json(final);
  });
});//pathid get req

module.exports = router;
