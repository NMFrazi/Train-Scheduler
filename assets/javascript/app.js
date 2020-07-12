var firebaseConfig = {
  apiKey: "AIzaSyCB7qVEJAW1rBeu5AnpZ1nZR-ifBPpWmwM",
  authDomain: "train-schedule-3b7f4.firebaseapp.com",
  databaseURL: "https://train-schedule-3b7f4.firebaseio.com",
  projectId: "train-schedule-3b7f4",
  storageBucket: "train-schedule-3b7f4.appspot.com",
  messagingSenderId: "436693462939",
  appId: "1:436693462939:web:e7315fc1ad7b29f8883b3e",
  measurementId: "G-H2BSFS3QEB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

var database = firebase.database();

var trainName = "";
var destination = "";
var time = "";
var frequency = "";
var arrival = "";

$("#submitButton").on("click", function (event) {
  event.preventDefault();

  console.log(trainName);
  console.log(destination);
  console.log(time);
  console.log(frequency);
  console.log(arrival);

  database.ref().push({
    name: trainName,
    destination: destination,
    time: time,
    frequency: frequency,
    arrival: arrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMPS,
  });

  setInterval(function (startTime) {
    $("#timer").html(moment().format("hh:mm a"));
  }, 1000);

  $("#newTrainName").val("");
  $("#newDestination").val("");
  $("#newFirstTrainTime").val("");
  $("#newTrainFrequency").val("");
  $("#newNextArrival");
});

database.ref().on("child_added", function (childSnapshot) {
  var train = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  var arrival = childSnapshot.val().dateAdded;

  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(
    1,
    "months"
  );

  var currentTime = moment();

  $("#timer").text(currentTime.format("hh:mm a"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  var tRemainder = diffTime % frequency;

  var minutesAway = frequency - tRemainder;

  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");

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
