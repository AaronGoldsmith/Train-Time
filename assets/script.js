
// FIREBASE CONFIGURATION, INITIALIZATION
<<<<<<< HEAD
  var config = {
    apiKey: "AIzaSyC7Hc_Yh01FK4eZCV7h_ZMdA63xFWBqrfg",
    authDomain: "train-scheduler-1b2a5.firebaseapp.com",
    databaseURL: "https://train-scheduler-1b2a5.firebaseio.com",
    projectId: "train-scheduler-1b2a5",
    storageBucket: "train-scheduler-1b2a5.appspot.com",
    messagingSenderId: "694734863457"
  };
  firebase.initializeApp(config);
=======
var admin = require('firebase-admin');
var serviceAccount = require('../train-scheduler-1b2a5-firebase-adminsdk-kc42l-c23669823f.json');

// Initialize Firebase
var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://train-scheduler-1b2a5.firebaseio.com/'
  });
>>>>>>> 786c083d7f2dfa26e3ff6f43d3b7fe40589387d8

// db ref
var database = app.database();


function changeRed(element){
    element.css("background","red")
}

function validateParse(inputTag){
        return inputTag.text().length()>0;
}

// should be passing data into function
function pushTrainRow(named,destination,freq,ETA,minRemain){
    var td = "</td><td>";
    var pTag = "<tr><td>"+named+td+destination+td+freq+td+ETA+td+minRemain+"</td></tr>"
    $("tbody").append(pTag);
}




$(document).ready(function(){

    $("#submitForm").on("click", function(){
        event.preventDefault();
        // var trainID = Math.random().toString(36).substring(7);
        var name = $("#trainName").val().trim()
        var dest = $("#dest").val().trim()
        var tTime = $("#train-time").val().trim()
        var freq = $("#freq").val().trim()
      
        var newTrain = {
                name : name,
                destination: dest,
                timeInitial: tTime,
                freq : freq
            };
        database.ref().push(newTrain);

        $("#trainName").val("")
        $("#dest").val("")
        $("#train-time").val("")
        $("#freq").val("")
    });

});


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var _name = childSnapshot.val().name; //
    var _dest = childSnapshot.val().destination; // 
    var _freq = parseInt(childSnapshot.val().freq); //

    var now = moment()
    var firstTime = childSnapshot.val().timeInitial;;
    var first = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(first), "minutes");
    var tRemainder = diffTime % _freq;
    var tminus = _freq - tRemainder;
    var next = moment().add(tminus, "minutes").format("hh:mma");

    pushTrainRow(_name,_dest,_freq,next,tminus);
});

    



