var config = {
    apiKey: "AIzaSyC7Hc_Yh01FK4eZCV7h_ZMdA63xFWBqrfg",
    authDomain: "train-scheduler-1b2a5.firebaseapp.com",
    databaseURL: "https://train-scheduler-1b2a5.firebaseio.com",
    projectId: "train-scheduler-1b2a5",
    storageBucket: "train-scheduler-1b2a5.appspot.com",
    messagingSenderId: "694734863457"
};
firebase.initializeApp(config);
var database = firebase.database();
database.ref("/testing").push({
    name : Aaron,
    role : Developer
})