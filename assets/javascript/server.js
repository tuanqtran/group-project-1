  var config = {

  };
  firebase.initializeApp(config);

  var database = firebase.database();

  
 // Set Initial Counter 
var initialValue = 0;
var likeCounter = initialValue;  

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());


  // Change the likeCounter to match the data in the database
  likeCounter = snapshot.val().likeCount;

  // Log the value of the likeCounter
  console.log(likeCounter);

// If any errors are experienced, log them to console. 
}, function (errorObject) {

    console.log("The read failed: " + errorObject.code);

});

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#thumb").one("click", function() {

  // Reduce the likeCounter by 1
  likeCounter++;

  // Alert User and reset the counter
  if (likeCounter == 0 ) {
    alert("Phew! You made it! That sure was a lot of clicking.");
    likeCounter = initialValue;
  }

  // Save new value to Firebase
  database.ref().set({
    likeCount: likeCounter
  });

  // Log the value of likeCounter
  console.log(likeCounter);

});



