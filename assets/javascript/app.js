// firebase
// create train data in database var trainData = firebase.database
// on click for submit button
// trainData.ref().push(var)
// grab user input and alert that new train was added
// if else statements

var config = {
   apiKey: "AIzaSyCThXe0h0Thg-OqnqMp9aYYll75ON4rjxY",
   authDomain: "train-scheduler-4acab.firebaseapp.com",
   databaseURL: "https://train-scheduler-4acab.firebaseio.com",
   projectId: "train-scheduler-4acab",
   storageBucket: "train-scheduler-4acab.appspot.com",
   messagingSenderId: "118042985819"
};
firebase.initializeApp(config);

var trainData = firebase.database();

$("#add-train-btn").on("click", function () {
   event.preventDefault();

   var trainName = $("#train-name-input").val().trim();
   var destName = $("#destination-input").val().trim();
   var firstArrival = $("#first-train-input").val().trim();
   var freqInput = $("#frequency-input").val().trim();

   console.log(firstArrival)
   console.log(freqInput)


   var newTrain = {
       name: trainName,
       destination: destName,
       arrival: firstArrival,
       frequency: freqInput,
   };



   trainData.ref().push(newTrain);

   console.log(newTrain.name);
   console.log(newTrain.destination);
   console.log(newTrain.arrival);
   console.log(newTrain.frequency);

   alert("New train successfully added");

   $("#train-name-input").val("");
   $("#destination-input").val("");
   $("#first-time-input").val("");
   $("#frequency-input").val("");

   return false;
});

trainData.ref().on("child_added", function (childSnapshot) {
   // var nameTrain = childSnapshot.val().name;
   // var trainDest = childSnapshot.val().destination;
   // var trainArrive = childSnapshot.val().arrival;
   // var trainFreq = childSnapshot.val().frequency;
      var tName = childSnapshot.val().name;
      var tDest = childSnapshot.val().destination;
      var tFrequency = childSnapshot.val().frequency;
      var tFirstTrain = childSnapshot.val().arrival;

      console.log(tFrequency);

   // console.log(nameTrain);
   // console.log(trainDest);
   // console.log(trainArrive);
   // console.log(trainFreq);
   
   

   // var trainFrequency = tFrequency;
   // var firstTrain ='"' + tFirstTrain + '"';

   // console.log(trainFrequency);
   // console.log(firstTrain);

   var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);

   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);

   var timeRemain = diffTime % tFrequency;
   console.log(timeRemain);

   var mintuesTillTrain = tFrequency - timeRemain;
   console.log("MINTUES TILL TRAIN: " + mintuesTillTrain);

   var nextTrain = moment().add(mintuesTillTrain, "minutes").format("hh:mm");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   // var newRow = $("<tr>").append(
   //     $("<td>").text(tName),
   //     $("<td>").text(tDest),
   //     $("<td>").text(tFirstTrain),
   //     $("<td>").text(tFrequency),
   //     $("<td>").text(tFrequency)
   // );
      var newRow = $(`<tr>
      <th>${tName}</th>
      <th>${tDest}</th>
      <th>${tFrequency}</th>
      <th>${nextTrain}</th>
      <th>${mintuesTillTrain}</th>
   </tr>`);
   $("#schedule-table > tbody").append(newRow);
});