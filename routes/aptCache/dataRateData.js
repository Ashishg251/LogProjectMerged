/*Copyright 2016 Wipro Limited, NIIT Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This code is written by Ashish Gupta, Tarun Mohandas, Suriya Prakash, Srinivasa Burli, Jishnu Surendran and Bhairavi Balakrishnan*/

var express = require('express');
var router = express.Router();
var fs = require('fs');

var Logs = require('../../models/dbConfig').aptLogModel;

router.get('/size/:packagetype=?/:year=?/:datename=?',function(req,res,next){
  var year = parseInt(req.params.year);
  var packagetype = req.params.packagetype;
  var datename = req.params.datename;
  var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  data = new Array();
  sp = datename.split('_');

  if(sp[0]==="monthwise"){

    for(var i=0; i<12; i++)
    {
      tempObj = new Object();
      tempObj["period"] = month[i];
      tempObj["Input"] = 0;
      tempObj["Output"] = 0;
      data.push(tempObj);
    }
    if(packagetype==="all")
    {
      match = {"year":year};
      period= "$month";
    }
    else if(packagetype==="package")
    {
      match = {"year":year,"download":/.deb/};
      period= "$month";
    }
    else if(packagetype==="metadata")
    {
      match = {"year":year,"download":{$not:/.deb/}};
      period= "$month";
    }

  }
  else{
    val=month.indexOf(sp[0])+1
    len=new Date(year,val,0).getDate();
    for(var i=1; i<=len; i++)
    {
      tempObj = new Object();
      tempObj["period"] =i;
      tempObj["Input"] = 0;
      tempObj["Output"] = 0;
      data.push(tempObj);
    }
    if(packagetype==="all")
    {
      match = {"year":year,"month":sp[0]};
      period= "$date";
    }
    else if(packagetype==="package")
    {
      match = {"year":year,"month":sp[0],"download":/.deb/};
      period= "$date";
    }
    else if(packagetype==="metadata")
    {
      match = {"year":year,"month":sp[0],"download":{$not:/.deb/}};
      period= "$date";
    }
  }
 function yearly(result){
   for(var i=0; i<result.length; i++)
   {
       if(result[i]["_id"]["Type"]==="I")
       {
           data[month.indexOf(result[i]["_id"]["period"])]["Input"]+=result[i]["size"];
       }
       else
       {
           data[month.indexOf(result[i]["_id"]["period"])]["Output"]+=result[i]["size"];
       }
   }
 }
 function monthly(result){
   for(var i=0; i<result.length; i++)
   {
       if(result[i]["_id"]["Type"]==="I")
       {
           data[result[i]["_id"]["period"]-1]["Input"]+=result[i]["size"];
       }
       else
       {
           data[result[i]["_id"]["period"]-1]["Output"]+=result[i]["size"];
       }
   }
 }

  Logs.aggregate([{$match:match},{$group:{_id: {"period":period,"Type":"$mode"},size:{$sum:"$size"}}}],function(err,result){

    if(sp[0]==="monthwise"){
      yearly(result);
    }
    else{
      monthly(result);
    }

    res.json(data);
  });

});

module.exports = router;
