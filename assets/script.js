
// FIREBASE CONFIGURATION, INITIALIZATION
const config = {
    apiKey: process.env.DB_SECRET,
    authDomain: process.env.DB_AUTHDOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: "train-scheduler-1b2a5",
    storageBucket: process.env.DB_SB,
    messagingSenderId: "694734863457"
  };
  firebase.initializeApp(config);

// db ref
var database = firebase.database();


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
    $("#addTrain").on("click",function(){
        event.preventDefault();
        $('.train-input').css('visibility','visible');
        $('.train-input').addClass('activated')
    });
    $(".closeTrain").on("click",function(){
        event.preventDefault();
        $('.train-input').css('visibility','hidden');
        $('.train-input').removeClass('activated')

    });
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

    



