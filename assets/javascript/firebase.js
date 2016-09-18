// Initialize Firebase

// Get a reference to the database service
var database = firebase.database();

// Set Initial Counter 
var initialValue = 0;
var clickCounter = initialValue; 
var initialValue2 = 0;
var clickCounter2 = initialValue2;  

database.ref().set({
  ourCounters: {
    initialValue: 0,
    initialValue2: 0
  }
})

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#fireBaseThumbUp").on("click", function() {
  // console.log("This is thumbs up before: " + clickCounter);
  // Reduce the clickCounter by 1
  clickCounter++;

  // Save new value to Firebase
  database.ref().update({
    ourCounters: {
      initialValue: clickCounter,
      initialValue2: clickCounter2
    }
  });

  console.log("This is thumbs up after: " + clickCounter);

});

// database.ref().on("child_added"), function(childSnapshot){
//   console.log();
// }

// Whenever a user clicks the click button
$("#firebaseFakeThumbDown").on("click", function() {
  // console.log("This is fake thumbs up before: " + clickCounter2);
  // Reduce the clickCounter by 1
  clickCounter2++;

  // Save new value to Firebase

  database.ref().update({
    ourCounters: {
      initialValue: clickCounter,
      initialValue2: clickCounter2
    }
  });

  console.log("This is fake thumbs up after: " + clickCounter2);


});
