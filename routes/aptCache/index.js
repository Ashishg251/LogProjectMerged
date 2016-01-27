var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/nginx', function(req, res, next) {
  res.render('nginx', { title: 'nginx' });
});

module.exports = router;
