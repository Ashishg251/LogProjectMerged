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

This code is written by Prateek Reddy Yammanuru, Shiva Manognya Kandikuppa, Uday Kumar Mydam, Nirup TNL, Sandeep Reddy G, Deepak Kumar*/

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var logSchema = new Schema({
  remote : String,
  host : String,
  user : String,
  method : String,
  path : String,
  code : Number,
  size : String,
  referer : String,
  agent : String,
  time : Date
},{collection: "logs"})//changed from serverhits

//mongoose.model('Logs', logSchema);
module.exports = logSchema;
