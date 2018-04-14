var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var firebase=require('firebase');
var admin = require("firebase-admin");
var exists;
var serviceAccount = require("../../../brodsaic-firebase-adminsdk-kh401-3a18a9964a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brodsaic.firebaseio.com"
});
var ref=admin.database().ref("/users");
var brodref=admin.database().ref("/broadcastList");


router.post('/', function(req, res, next) {
  usernameToFind=req.body.username;
  password=req.body.password;

  ref.child(usernameToFind).once('value', function(usersnapshot){

    // if data exists
    if (usersnapshot.exists()) {

      ref.child(usernameToFind).child("/password").on('value', function(passwordsnapshot){

        if(passwordsnapshot.val()===password){
          console.log(usersnapshot.child("/userType").val());
          res.send({success:true,usertype:usersnapshot.child("/userType").val(),nameOfUser:usersnapshot.child("/name").val()});
          
        }else {
          console.log(password);
          console.log(passwordsnapshot.val());
          res.send({success:false,message:'Password Incorrect'});
        }
      });
    } else {

      res.send({message:'User Do not Exists'});
    }
    exists=null;
  });

});
router.post('/getBroadcastList', function(req, res, next) {

  ref.child(req.query.id).child('/addedBroadcasts').on('value', function(list){

    
    var userBroadcastMap=list.toJSON();
    var userBroadcastlist=Object.keys(list.toJSON());

    var availableBroadcastLists={};
    
    var a=brodref.on('value',function(brodcastSnapshot){
      
      userBroadcastlist.forEach(element => {
        if(list.child(element).val()===true){
          availableBroadcastLists[element]=brodcastSnapshot.child(element).toJSON();
          
        }
      });
    });
    
    console.log(availableBroadcastLists);    
    res.send({userBroadcastList:availableBroadcastLists,success:true});
  });

  
  
});

module.exports = router;
