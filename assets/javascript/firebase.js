  var config = {
    apiKey: "AIzaSyA8P31fE7TFE-r_-XirZAenFCRMZUW_AKM",
    authDomain: "first-project-47625.firebaseapp.com",
    databaseURL: "https://first-project-47625.firebaseio.com",
    storageBucket: "first-project-47625.appspot.com",
    messagingSenderId: "963951273741"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
// Set Initial Counter 
var initialValue = 0;
var clickCounter = initialValue; 
var initialValue2 = 0;
var clickCounter2 = initialValue2;
var initialValue3 = 0;
var clickCounter3 = initialValue3;
var meh = 0;
// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {
  // Change the clickcounter to match the data in the database
  clickCounter = snapshot.val().ourCounters.likeCounter;
  clickCounter2 = snapshot.val().ourCounters.dislikeCounter;
  clickCounter3 = snapshot.val().ourCounters.mehCounter;
  // $(".thumbUp").attr("data-tooltip", clickCounter);
  // $(".fakeThumbDown").attr("data-tooltip", clickCounter2);
// If any errors are experienced, log them to console. 
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
// --------------------------------------------------------------
// Whenever a user clicks the click button
$("#fireBaseThumbUp").one("click", function() {
  // console.log("This is thumbs up before: " + clickCounter);
  // Reduce the clickCounter by 1
  clickCounter++;
  meh++;
  mehF();
  // Save new value to Firebase
  database.ref().update({
    ourCounters: {
      likeCounter: clickCounter,
      dislikeCounter: clickCounter2,
      mehCounter: clickCounter3
    }
  });
  console.log("This is thumbs up after: " + clickCounter);
});
// database.ref().on("child_added"), function(childSnapshot){
//   console.log();
// }
// Whenever a user clicks the click button
$("#firebaseFakeThumbDown").one("click", function() {
  // console.log("This is fake thumbs up before: " + clickCounter2);
  // Reduce the clickCounter by 1
  clickCounter2++;
  meh++;
  mehF();
  // Save new value to Firebase
  database.ref().update({
    ourCounters: {
      likeCounter: clickCounter,
      dislikeCounter: clickCounter2,
      mehCounter: clickCounter3
    }
  });
  console.log("This is fake thumbs up after: " + clickCounter2);
});
function mehF() {
  if (meh == 2) {
    clickCounter3 ++;
  }
}