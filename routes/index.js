var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/nginx', function(req, res, next) {
  res.render('nginx', { title: 'nginx' });
});

module.exports = router;
