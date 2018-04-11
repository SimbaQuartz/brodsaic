var express = require('express');
var router = express.Router();
var mysql=requier('mysql');
var firebase=requier('firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
