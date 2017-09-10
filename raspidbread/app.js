// Initialize Firebase
const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyC6ombLPK8wJMUqtxHlUZxKnhTvCbb_-3E",
    authDomain: "gavforraspberrypitest1.firebaseapp.com",
    databaseURL: "https://gavforraspberrypitest1.firebaseio.com",
    projectId: "gavforraspberrypitest1",
    storageBucket: "gavforraspberrypitest1.appspot.com",
    messagingSenderId: "207993653406"
};
firebase.initializeApp(config);

console.log("Project is Start");

const database = firebase.database();

var iotdevicesRef = database.ref().child('pengfeihome').child('iotlight');
iotdevicesRef.on('value',snapshot=>{
    if(snapshot){
        console.log("Data is comming",snapshot.val());
    }
});


