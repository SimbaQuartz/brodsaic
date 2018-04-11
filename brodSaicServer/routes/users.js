var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var firebase=require('firebase');
var admin = require("firebase-admin");
var exists;
var serviceAccount = require("../../../brodsaic-firebase-adminsdk-kh401-a6b6a41075.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brodsaic.firebaseio.com"
});
var ref=admin.database().ref("/users");


router.post('/', function(req, res, next) {
  usernameToFind=req.body.username;
  
  ref.child(usernameToFind).once('value', function(snapshot){
    // if data exists
    if (snapshot.exists()) {

      res.send({message:'True'});
    } else {

      res.send({message:'False'});
    }
    exists=null;
  });

});

module.exports = router;
