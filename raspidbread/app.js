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
//firebase.database().ref("pengfeihome/iotlight/").child("kiching").set(false);

const database = firebase.database();

var iotdevicesRef = database.ref().child('pengfeihome').child('iotlight');
iotdevicesRef.on('child_changed',(snapshot,prevChildKey)=>{
    if(snapshot){
        console.log("Data is comming:",snapshot.key," : ",snapshot.val());
    }
});