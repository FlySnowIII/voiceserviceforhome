// Initialize Firebase
const firebase = require('firebase');
const noble = require('noble');
require('date-utils');

const config = {
    apiKey: "AIzaSyC6ombLPK8wJMUqtxHlUZxKnhTvCbb_-3E",
    authDomain: "gavforraspberrypitest1.firebaseapp.com",
    databaseURL: "https://gavforraspberrypitest1.firebaseio.com",
    projectId: "gavforraspberrypitest1",
    storageBucket: "gavforraspberrypitest1.appspot.com",
    messagingSenderId: "207993653406"
};
firebase.initializeApp(config);

var ledAddress = '';
var serviceUUID = '';
var ledid = '';

console.log("Project is Start");
//firebase.database().ref("pengfeihome/iotlight/").child("kiching").set(false);

const database = firebase.database();

var iotdevicesRef = database.ref().child('pengfeihome').child('iotlight');
iotdevicesRef.on('child_changed',(snapshot,prevChildKey)=>{
    if(snapshot){
        var firebaseObj = snapshot.val();
        console.log("Data is comming:",snapshot.key," : ",snapshot.val());
        ledAddress = firebaseObj.address;
        serviceUUID = firebaseObj.uuid;
        ledid = firebaseObj.gpionum;

        if(firebaseObj.state === false){
            ledid = ledid + 3;
        }

        noble.startScanning();
        noble.on('stateChange',function(state){
            if(state === 'poweredOn'){
                console.log("Notebook is scannging...");
                noble.startScanning();
            }
        });
    }
});


noble.on('discover',function(pprl){
//	console.log('Found Peripheral:',pprl.address,'UUID:',pprl.uuid);
//	console.log(ledAddress);
	if(pprl.address === ledAddress)
	{
//		console.log('Scan is Stop!');
		noble.stopScanning();
		
		pprl.connect(function(err){
			pprl.discoverServices([serviceUUID],function(err,services){
				services.forEach(function(service){
					service.discoverCharacteristics([],function(err,chcs){
						chcs.forEach(function(chc){
//							console.log(chc.uuid);
							chc.write(new Buffer(ledid.toString(),'ascii'),true);
							//pprl.disconnect();
							chc.read(function(err,data){
//								console.log(data);
								pprl.disconnect();
							});
						});
					});
				});
			});
		});
	}

});