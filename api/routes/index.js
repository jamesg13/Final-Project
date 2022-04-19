var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  res.send('Welcome to CORS server 😁');
  res.render('index', { title: 'Express' });
});

module.exports = router;
