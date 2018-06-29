var config = {
		apiKey: "AIzaSyBnPLmoLynDVrca0XvSMT6R3MwK-Z9YSM8",
		authDomain: "train-scheduler-54cc1.firebaseapp.com",
		databaseURL: "https://train-scheduler-54cc1.firebaseio.com",
		projectId: "train-scheduler-54cc1",
		storageBucket: "train-scheduler-54cc1.appspot.com",
		messagingSenderId: "514101950251"
		
	  };
	  firebase.initializeApp(config)
	var timeData = firebase.database()
$(document).ready(function(){

	
	  
	
	  
	$("#submit").on("click", function(){


		var lineName = $("#lineNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var firstRun = moment($("#trainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
		var frequency = $("#frequencyInput").val().trim();


		var trainInfo = {
			name:  lineName,
			destination: destination,
			firstRun: firstRun,
			frequency: frequency
		};

		
		timeData.push(trainInfo);

		console.log(trainInfo.name);
		console.log(trainInfo.destination); 
		console.log(firstRun);
		console.log(trainInfo.frequency)

		

		

		
		$("#lineNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

	

		return false;
	});


	
	timeData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

	
		var fbaseName = childSnapshot.val().name;
		var fbaseDestination = childSnapshot.val().destination;
		var fbaseFrequency = childSnapshot.val().frequency;
		var fbaseFirstRun = childSnapshot.val().firstRun;

		
		var differenceTimes = moment().diff(moment.unix(fbaseFirstRun), "minutes");
		var remainder = moment().diff(moment.unix(fbaseFirstRun), "minutes") % fbaseFrequency ;
		var minutes = fbaseFrequency - remainder;

		var arrival = moment().add(minutes, "m").format("hh:mm A"); 
		console.log(minutes);
		console.log(arrival);

		console.log(moment().format("hh:mm A"));
		console.log(arrival);
		console.log(moment().format("X"));


		$("#trainSchedule > tbody").append("<tr><td>" + fbaseName + "</td><td>" + fbaseDestination + "</td><td>" + fbaseFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

	});
});