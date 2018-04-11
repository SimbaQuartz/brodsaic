var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var firebase=require('firebase');
var admin = require("firebase-admin");

var serviceAccount = require("C:\Users\Manjot Singh\Downloads\brodsaic-firebase-adminsdk-kh401-a6b6a41075.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brodsaic.firebaseio.com"
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
