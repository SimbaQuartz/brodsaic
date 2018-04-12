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
  password=req.body.password;
  ref.child(usernameToFind).once('value', function(usersnapshot){
    // if data exists
    if (usersnapshot.exists()) {
      ref.child(usernameToFind).child("/password").on('value', function(passwordsnapshot){
        if(passwordsnapshot.val()===password){
          console.log(usersnapshot.child("/userType").val());
          res.send({success:true,usertype:usersnapshot.child("/userType").val()});
          
        }else {
          console.log(password);
          console.log(passwordsnapshot.val());
          res.send({success:false,message:'Failed'});
        }
      });
    } else {

      res.send({message:'False'});
    }
    exists=null;
  });

});

module.exports = router;
