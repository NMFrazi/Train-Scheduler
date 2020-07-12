
var firebaseConfig = {
  apiKey: "AIzaSyBUJn1ZC8fjOha_GMIbjYOyfMaepE6k9h4",
  authDomain: "train-project-vgarcia.firebaseapp.com",
  databaseURL: "https://train-project-vgarcia.firebaseio.com",
  projectId: "train-project-vgarcia",
  storageBucket: "train-project-vgarcia.appspot.com",
  messagingSenderId: "225604754998",
  appId: "1:225604754998:web:e4f1edad1172c23ef78297",
};
 
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainName = "";
var destination = "";
var time = "";
var frequency = "";

setInterval(function (startTime) {
  $("#timer").html(moment().format("hh:mm a"));
}, 1000);

$("#submitButton").on("click", function (event) {
 
  event.preventDefault();
  
  trainName = $("#newTrainName").val().trim();
  destination = $("#newDestination").val().trim();
  time = $("#newFirstTrainTime").val().trim();
  frequency = $("#newTrainFrequency").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  pushes value into database
  database.ref().push({
    name: trainName,
    destination: destination,
    time: time,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  });
 
  $("#newTrainName").val("");
  $("#newDestination").val("");
  $("#newFirstTrainTime").val("");
  $("#newTrainFrequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
 
  var train = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  var dateAdded = childSnapshot.val().dateAdded;

  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

  var currentTime = moment();

  $("#timer").text(currentTime.format("hh:mm a"));


  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  
  var tRemainder = diffTime % frequency;


  var minutesAway = frequency - tRemainder;

 
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

  $("#trainData").append(
    "<tr><td>" +
      train +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      nextArrival +
      "</td><td>" +
      minutesAway +
      "</td></tr>"
  );
});
