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
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
        center: new google.maps.LatLng(39.8282, -98.5795)
    });
    geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow;
  //   var styledMapType = new google.maps.StyledMapType(
		// [
		// 	{
		// 		stylers: [
		// 			{ hue: '#000' },
		// 			{ saturation: 0 }
		// 		]
		// 	},{
		// 		featureType: 'road',
		// 		elementType: 'geometry',
		// 		stylers: [
		// 			{ lightness: 100 },
		// 			{ visibility: 'simplified' }
		// 		]
		// 	},{
		// 		featureType: 'road',
		// 		elementType: 'labels',
		// 		stylers: [
		// 			{ visibility: 'off' }
		// 		]
		// 	}
		// ],
		// {name: 'Styled Map'});

  //   map.mapTypes.set('styled_map', styledMapType);
  //   map.setMapTypeId('styled_map');
};

// Beginning of the click event that triggers the queries between the Meetup API and Google Maps API.
$('#searchBtn').on('click', function() {
	// var loading_screen = pleaseWait({
	// 	logo: "assets/portfolio/pic.jpg",
	// 	backgroundColor: '#f46d3b',
	// 	loadingHtml: "<div class='sk-spinner sk-spinner-pulse'></div>",
	// });

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
		initMap();
		// console.log(results);
		for (var i=0; i<results.length; i++) {
			// Pushes data gathered from the AJAX query into their associated arrays.
			coordinates.push(results[i].lat + ', ' + results[i].lon);
			eventInfo.push({
				eventName: results[i].name,
				eventDescription: results[i].description,
				eventLink: results[i].link,
				eventOrganizerName: results[i].organizer.name,
				eventCity: results[i].city,
				eventFounded: results[i].created,
				// eventPhoto: results[i].photos[0].photo_link, //Not everyone has a photo.
				nextEventName: results[i].next_event.name,
				nextEvent: results[i].next_event.time,
				nextEventRSVP: results[i].next_event.yes_rsvp_count

			});
			// Concatenates objects from the 'eventInfo' array and sets it equal to the var 'contentString', which is then used within the 'infowindow' pop-up that appears whenever a map marker is clicked.
			contentString = '<div class="iw-container"><div class="iw-title center">' + eventInfo[i].eventName + '</div><div class="main-text-padding"><div class="text-justify text-padding">' + eventInfo[i].eventDescription + '<br><a href=' + eventInfo[i].eventLink + '>Meetup.com Event Link</a></div></div></div>';

			eventAdder = '<div class="col s6 m4 l2 center modal-card-margin"><div class="card image-hover"><div class="card-image waves-effect waves-block waves-black">' +
				'<img class="activator eventImg" src=' + 'eventInfo[i].eventPhoto' + '></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' +
				eventInfo[i].eventName + '<i class="material-icons right">more_vert</i></span><p><a href="' + eventInfo[i].eventLink + '">Meetup Weblink</a></p></div>' +
				'<div class="card-reveal"><span class="card-title grey-text text-darken-4">' + eventInfo[i].eventName + '<i class="material-icons right">close</i></span>' +
				'<br> <p><strong>Founded: </strong>' + moment(eventInfo[i].eventFounded).format("MM DD YYYY") + '</p> <br> <p><strong>Name of the next event: </strong>' + eventInfo[i].nextEventName + '</p> <br> <p><strong>Timing of the next event: </strong>' + moment(eventInfo[i].nextEvent).format("MM DD YYYY hh:mm A")+ '</p>' +
				'<br> <p><strong>RSVP: </strong>' + eventInfo[i].nextEventRSVP + '</p></div></div></div>'
			// Calling the function defined below.
			geocodeLatLng(map, marker, infowindow, contentString);
			// Function that takes inputs and, in turn, creates map markers and infowindows accordingly.
			function geocodeLatLng(map, marker, infowindow, contentString, eventAdder) {
				var input = coordinates[i];
			    var latlngStr = input.split(',', 2);
			    var latlng = {
			        lat: parseFloat(latlngStr[0]) + Math.random()*0.01,
			        lng: parseFloat(latlngStr[1]) + Math.random()*0.01
			    };
	        	map.setCenter(latlng);
                map.setZoom(13);
                marker = new google.maps.Marker({
                    map: map,
                    position: latlng,
                    animation: google.maps.Animation.DROP
                });
                infowindow = new google.maps.InfoWindow({
					content: contentString,
					// setEditable: true

				});

                marker.addListener('click', function() {
                	infowindow.open(map, marker);
                	$(".gm-style-iw").siblings().children(':nth-child(2)').css({'display': 'none'});
                	$(".gm-style-iw").siblings().children(':nth-child(4)').css({'display': 'none'});
                	$(".gm-style-iw").siblings().children('img').parent().addClass("infoWindowClose");
                   	$(".gm-style-iw").parent().addClass("infoWindowSize");
             
                });

                // console.log(eventInfo[i].eventName);
                // console.log(results[i].organizer.name); /Works
                // console.log(eventInfo[i].eventOrganizerName);
                // console.log(eventInfo[i].eventPhoto);
                // console.log(results[i].photos[0].photo_link);
			};


			$("#modal2 .row").append(eventAdder);


		};
		// console.log($(".gm-style-iw"));
		// console.log($(".gm-style-iw").children());
		// console.log($(".gm-style-iw").children().siblings());
	
	}); // End of the AJAX query event.

	// setTimeout(loading_screen.finish.bind(loading_screen), 5000);
	
}); // End of the click event.



$(document).ready(function() {

	$.simpleWeather({
		location: 'Austin, TX',
		unit: 'f',

	success: function(weather) {
		html = '<img id="weatherImage" src='+weather.image+'>';
		html += "<p>Today's Weather</p>"
		html += '<div class="tempwrapper"><h3 id="currenttemp">'+weather.temp+'&deg;'+weather.units.temp+'</h3>';
		html += '<div class="smalltempwrapper"><p id="hightemp">'+ "H: " +weather.high+'&deg;F</p><p id="lowtemp">'+ "L: " +weather.low+'&deg;F</p></div></div>';
		html += '<ul><li id="weatherFullWidth">'+weather.city+', '+weather.region+'</li>';
		html += '<li id="weatherLeftHalf">'+weather.currently+'</li>';
		html += '<li id="weatherRightHalf">Humidity: '+weather.humidity+'%</li></ul>';
		html += '<div id="weatherForecast">'
		// html += '<img class="logoimg" src="assets/images/logo.png">';
		
		for(var i=0;i<5;i++) {
			html += '<img src=' + weather.forecast[i].thumbnail + '><p>' + weather.forecast[i].day + ':' + weather.forecast[i].high + "&deg;F</p>";
		}

		html += '</div><div id="weatherLink"><a href="' + weather.link + '">Full Forecast Here</a></div>';
		html += '<div><p class="movedown valign-wrapper white-text">Last updated: '+ weather.updated +'</p></div>'

		$(".weather").html(html);

	},

		error: function(error) {
			$(".weather").html('<p>'+error+'</p>');
		}
	});
});


