// Global Variables
var map;
var geocoder;
var infowindow;
var coordinates = [];
var eventInfo = [];
var contentString;
var marker;
// Function that initializes the map and makes it appear on the page via callback.
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(39.8282, -98.5795)
    });
    geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow;
};
// Beginning of the click event that triggers the queries between the Meetup API and Google Maps API.
$('#searchBtn').on('click', function() {
	// Clears data (from previous queries) from the arrays.
	coordinates = [];
	eventInfo = [];
	// Stores user inputs into variables that are necessary for the Meetup API query.
	var text = $('#textInput').val().trim();
	var location = $('#locationInput').val().trim();
	var amountOfResults = $('#resultsNumInput').val().trim();
    // Meetup API V3 query url that contains parameters which allow users to perform a raw full text and location query.
    var queryURL = "https://api.meetup.com/find/groups?&sign=true&photo-host=public&filter=all&upcoming_events=true&fallback_suggestions=true&country=US&location="+location+"&radius=smart&text="+text+"&page="+amountOfResults+"&key=2b1e504a1c3ea586da4a465e6c5223";
    // Additional features include:
    // - Limiting the country to the U.S. and only displaying groups that have upcoming events.
    // - A dynamic search radius based on the number of active groups in the area.
    // - Returning a list of curated suggestions if criteria was not found.
    // Beginning of the AJAX query event.
    $.ajax({url: queryURL, method: 'GET', dataType: 'jsonp'}).done(function(response) {
		// Stores the data returned from the Meetup API into the variable 'results'.
		var results = response.data;
		// Self-invoking, recursive function that is used to work around the Maps API's query limitations by performing a for-loop with a delay.
		(function qLimitAvoider(i) {
			// Stores the number of results returned into the variable 'j', which will be necessary to establish the conditional statement below.
			var j = amountOfResults;
			// Beginning of the setTimeout function.
			setTimeout(function () {
				// Pushes data gathered from the AJAX query into their associated arrays.
				coordinates.push(results[i].lat + ', ' + results[i].lon);
				eventInfo.push({
					eventName: results[i].name,
					eventDescription: results[i].description,
					eventLink: results[i].link
				});
				// Concatenates objects from the 'eventInfo' array and sets it equal to the var 'contentString', which is then used within the 'infowindow' pop-up that appears whenever a map marker is clicked.
				contentString = '<h1>' + eventInfo[i].eventName + '</h1>' + eventInfo[i].eventDescription + '<br><a href=' + eventInfo[i].eventLink + '>Meetup.com Event Link</a>';
				// Calling the function defined below.
				geocodeLatLng(geocoder, map, infowindow, contentString);
				// Function that takes inputs and, in turn, creates map markers and infowindows accordingly.
				function geocodeLatLng(geocoder, map, infowindow, contentString) {
					var input = coordinates[i];
				    var latlngStr = input.split(',', 2);
				    var latlng = {
				        lat: parseFloat(latlngStr[0]),
				        lng: parseFloat(latlngStr[1])
				    };
				    geocoder.geocode({'location': latlng}, function(results, status) {
				        if (status === 'OK') {
				        	map.setCenter(latlng);
			                map.setZoom(10);
			                marker = new google.maps.Marker({
			                    map: map,
			                    position: latlng
			                });
			                infowindow = new google.maps.InfoWindow({
								content: contentString
							});
			                marker.addListener('click', function() {
			                	infowindow.open(map, marker);
			                });
				        } else {
				            window.alert('Geocoder failed due to: ' + status);
				        };
				    });
				};
				if (i < (j-1)) {
					i++;
					qLimitAvoider(i);
				}; // End of the conditional statement that allows the main function to be recursively called.
			}, 1100); // End of the setTimeout function; delay set to 1.1 sec.
		})(0); // End of the main function; passed in 0 as "i"'s starting value.
	}); // End of the AJAX query event.
}); // End of the click event.
