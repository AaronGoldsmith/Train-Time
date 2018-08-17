
// FIREBASE CONFIGURATION, INITIALIZATION

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7Hc_Yh01FK4eZCV7h_ZMdA63xFWBqrfg",
    authDomain: "train-scheduler-1b2a5.firebaseapp.com",
    databaseURL: "https://train-scheduler-1b2a5.firebaseio.com",
    projectId: "train-scheduler-1b2a5",
    storageBucket: "train-scheduler-1b2a5.appspot.com",
    messagingSenderId: "694734863457"
  };
  firebase.initializeApp(config);

// db ref
var database = firebase.database();
var rootRef = database.ref("/")
var roleList = ["Team Lead","Project Manager", "Developer", "Sales", "UI/UX"];
// var cities = ["Albuquerque","Alexandria","Allentown","Amarillo","Anaheim","Anchorage","Ann Arbor","Antioch","Apple Valley","Appleton","Arlington","Arvada","Asheville","Athens","Atlanta","Atlantic City","Augusta","Aurora","Austin","Bakersfield","Baltimore","Barnstable","Baton Rouge","Beaumont","Bel Air","Bellevue","Berkeley","Bethlehem","Billings","Birmingham","Bloomington","Boise","Boise City","Bonita Springs","Boston","Boulder","Bradenton","Bremerton","Bridgeport","Brighton","Brownsville","Bryan","Buffalo","Burbank","Burlington","Cambridge","Canton","Cape Coral","Carrollton","Cary","Cathedral City","Cedar Rapids","Champaign","Chandler","Charleston","Charlotte","Chattanooga","Chesapeake","Chicago","Chula Vista","Cincinnati","Clarke County","Clarksville","Clearwater","Cleveland","College Station","Colorado Springs","Columbia","Columbus","Concord","Coral Springs","Corona","Corpus Christi","Costa Mesa","Dallas","Daly City","Danbury","Davenport","Davidson County","Dayton","Daytona Beach","Deltona","Denton","Denver","Des Moines","Detroit","Downey","Duluth","Durham","El Monte","El Paso","Elizabeth","Elk Grove","Elkhart","Erie","Escondido","Eugene","Evansville","Fairfield","Fargo","Fayetteville","Fitchburg","Flint","Fontana","Fort Collins","Fort Lauderdale","Fort Smith","Fort Walton Beach","Fort Wayne","Fort Worth","Frederick","Fremont","Fresno","Fullerton","Gainesville","Garden Grove","Garland","Gastonia","Gilbert","Glendale","Grand Prairie","Grand Rapids","Grayslake","Green Bay","GreenBay","Greensboro","Greenville","Gulfport-Biloxi","Hagerstown","Hampton","Harlingen","Harrisburg","Hartford","Havre de Grace","Hayward","Hemet","Henderson","Hesperia","Hialeah","Hickory","High Point","Hollywood","Honolulu","Houma","Houston","Howell","Huntington","Huntington Beach","Huntsville","Independence","Indianapolis","Inglewood","Irvine","Irving","Jackson","Jacksonville","Jefferson","Jersey City","Johnson City","Joliet","Kailua","Kalamazoo","Kaneohe","Kansas City","Kennewick","Kenosha","Killeen","Kissimmee","Knoxville","Lacey","Lafayette","Lake Charles","Lakeland","Lakewood","Lancaster","Lansing","Laredo","Las Cruces","Las Vegas","Layton","Leominster","Lewisville","Lexington","Lincoln","Little Rock","Long Beach","Lorain","Los Angeles","Louisville","Lowell","Lubbock","Macon","Madison","Manchester","Marina","Marysville","McAllen","McHenry","Medford","Melbourne","Memphis","Merced","Mesa","Mesquite","Miami","Milwaukee","Minneapolis","Miramar","Mission Viejo","Mobile","Modesto","Monroe","Monterey","Montgomery","Moreno Valley","Murfreesboro","Murrieta","Muskegon","Myrtle Beach","Naperville","Naples","Nashua","Nashville","New Bedford","New Haven","New London","New Orleans","New York","New York City","Newark","Newburgh","Newport News","Norfolk","Normal","Norman","North Charleston","North Las Vegas","North Port","Norwalk","Norwich","Oakland","Ocala","Oceanside","Odessa","Ogden","Oklahoma City","Olathe","Olympia","Omaha","Ontario","Orange","Orem","Orlando","Overland Park","Oxnard","Palm Bay","Palm Springs","Palmdale","Panama City","Pasadena","Paterson","Pembroke Pines","Pensacola","Peoria","Philadelphia","Phoenix","Pittsburgh","Plano","Pomona","Pompano Beach","Port Arthur","Port Orange","Port Saint Lucie","Port St. Lucie","Portland","Portsmouth","Poughkeepsie","Providence","Provo","Pueblo","Punta Gorda","Racine","Raleigh","Rancho Cucamonga","Reading","Redding","Reno","Richland","Richmond","Richmond County","Riverside","Roanoke","Rochester","Rockford","Roseville","Round Lake Beach","Sacramento","Saginaw","Saint Louis","Saint Paul","Saint Petersburg","Salem","Salinas","Salt Lake City","San Antonio","San Bernardino","San Buenaventura","San Diego","San Francisco","San Jose","Santa Ana","Santa Barbara","Santa Clara","Santa Clarita","Santa Cruz","Santa Maria","Santa Rosa","Sarasota","Savannah","Scottsdale","Scranton","Seaside","Seattle","Sebastian","Shreveport","Simi Valley","Sioux City","Sioux Falls","South Bend","South Lyon","Spartanburg","Spokane","Springdale","Springfield","St. Louis","St. Paul","St. Petersburg","Stamford","Sterling Heights","Stockton","Sunnyvale","Syracuse","Tacoma","Tallahassee","Tampa","Temecula","Tempe","Thornton","Thousand Oaks","Toledo","Topeka","Torrance","Trenton","Tucson","Tulsa","Tuscaloosa","Tyler","Utica","Vallejo","Vancouver","Vero Beach","Victorville","Virginia Beach","Visalia","Waco","Warren","Washington","Waterbury","Waterloo","West Covina","West Valley City","Westminster","Wichita","Wilmington","Winston","Winter Haven","Worcester","Yakima","Yonkers","York","Youngstown"]
/* HELPER FUNCTION TO RANDOMLY SELECT ROLE */
function getRole()
{
    return roleList[Math.floor(Math.random()*roleList.length)];
}

/* ADD CITIES ONE TIME TO BACKEND */
function addCities(){
    for(var i = 0;i<cities.length;i++){
        var cur = "city"+i;
        database.ref("/cities/").push(cities[i]);
    }
}

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
function checkNumber(n){
    return typeof parseInt(n) === Number;
}

function displayData(){

    var dbref = database.ref("/trains/");

    console.log(dbref.child("name"))
    
    var now = moment()
    var first = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(first), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tminus = tFrequency - tRemainder;
    var next = moment().add(tminus, "minutes");

    // pushTrainRow(nextTrain,next);
}

$(document).ready(function(){

    // database.ref("/trains").on("child_added",function(snapshot) {
    //     snapshot.forEach(function(row){
    //         console.log(row.val);
    //         console.log(row.child())
    //             var _name = row.child().val().name;
    //             var _dest = row.child().val().dest;
    //             var _time = row.val().time;
    //             var _freq = parseInt(row.val().freq);
    //             // hard code in
    //             pushTrainRow(_name,_dest,_freq,"0","0")
        
    //     });
    displayData();

 

    $("#submitForm").on("click", function(){
        event.preventDefault();
        // var trainID = Math.random().toString(36).substring(7);
        var name = $("#trainName").val().trim()
        var dest = $("#dest").val().trim()
        var tTime = $("#train-time").val().trim()
        var freq = $("#freq").val().trim()
      
        var newTrain = database.ref("/trains/train"+name).push();
        newTrain.set({
                name : name,
                destination: dest,
                timeInitial: tTime,
                freq : freq
            });
        

        

        $("#trainName").val("")
        $("#dest").val("")
        $("#train-time").val("")
        $("#freq").val("")
    });

});


        // if(name){
        //     changeRed(name)
        // }
        // else if(!validateParse(dest)){
        //     changeRed(dest)
        // }
        // else if(!moment(tTime).isValid()){
        //    changeRed(tTime)
        // }
        // else if(checkNumber(freq)){
        //     changeRed(freq);
        // }
        // else{
            
        //     })
        // }
    

    




