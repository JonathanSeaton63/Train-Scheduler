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

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    
    var trainName = $("train-name-input").val().trim();
    var destName = $("destination-input").val().trim();
    var firstArrival = moment($("first-time-input").val().trim(), "HH:mm").format("X");
    var freqInput = $("frequency-input").val().trim();

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
});

trainData.ref().on("child_added", function (childSnapshot) {
    var nameTrain = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainArrive = childSnapshot.val().arrival;
    var trainFreq = childSnapshot.val().frequency;

    console.log(nameTrain);
    console.log(trainDest);
    console.log(trainArrive);
    console.log(trainFreq);

    var trainFrequency = 15;
    var firstTrain = "6:15";

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(momment(firstTimeConverted), "mintues");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var timeRemain = diffTime % trainFrequency;
    console.log(timeRemain);

    var mintuesTillTrain = trainFrequency - timeRemain;
    console.log("MINTUES TILL TRAIN: " + mintuesTillTrain);

    var nextTrain = moment().add(mintuesTillTrain, "mintues");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destName),
        $("<td>").text(firstArrival),
        $("<td>").text(freqInput)
    );

    $("#schedule-table > tbody").append(newRow);

});




