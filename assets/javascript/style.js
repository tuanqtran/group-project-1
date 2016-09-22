$(document).ready(function(){
	// Materialize: Required to use collapse the sideNav.
	$('.button-collapse').sideNav({
    	menuWidth: 300, // Default is 240
    	edge: 'left', // Choose the horizontal origin
    	closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

	// Materialize: Required for the carousel slider to have full width.
	$('.carousel.carousel-slider').carousel({full_width: true});
	// Materialize: Required to open a modal using a trigger.
    $('.modal-trigger').leanModal();
    // Materialize: Required if search box are added dynamically. This allows us to initialize them.
    $('input#input_text, textarea#textarea1').characterCounter();
    // Materialize: Requried if the collapsible info are added dynamically. You can also pass in options inside the initialization.
    $('.collapsible').collapsible({
    	accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});


    // Upon hovering over a modal2 images, expand the main modal and strink/blur the rest. When the mouse leaves reset to normal.
	$(".image-hover").mouseover(function(){
		$(".image-hover").addClass("image-temp");
		$(this).addClass("image-active")
			.removeClass("image-hover");

		$(".image-hover").addClass("image-hover-nonactive")
			.removeClass("image-hover");
	}).mouseleave(function(){
		$(".image-temp").removeClass("image-active")
			.removeClass("image-hover-nonactive")
			.addClass("image-hover");
	});


	// $(".modal-highlight").mouseover(function(){
	// 	$(".modal-highlight").addClass("modal-temp");
	// 	$(this).addClass("modal-active")
	// 		.removeClass("modal-highlight");

	// 	$(".modal-highlight").addClass("modal-nonactive")
	// 		.removeClass("modal-highlight");
	// }).mouseleave(function(){
	// 	$(".modal-temp").removeClass("modal-active")
	// 		.removeClass("modal-nonactive")
	// 		.addClass("modal-highlight");
	// });

	// When hovering over the modal 4 icons container. Enlarge the chosen icon and decrease the rest.
	$(".linkAnimation").mouseover(function(){
		$(this).children().children().children().addClass("portfolio-icon-enlarge");
		$(this).siblings().children().children().children().addClass("portfolio-icon-shorten")
			.parent().parent().parent().parent().parent().parent().parent().siblings()
			.children().children().children().children().children().children()
			.children().addClass("portfolio-icon-shorten");
	}).mouseleave(function(){
		$(this).children().children().children().removeClass("portfolio-icon-enlarge")
		$(this).siblings().children().children().children().removeClass("portfolio-icon-shorten")
			.parent().parent().parent().parent().parent().parent().parent().siblings()
			.children().children().children().children().children().children()
			.children().removeClass("portfolio-icon-shorten");
	});

	// When hovering over the modal 4 profile cards, create a jelly effect to the other cards and brighten the chosen image. When the mouse leaves reset to normal.
	$(".profile-card").mouseover(function(){
		$(this).parent().siblings().children().children().addClass("wiggler");
		$(this).children(".card-image").children().addClass("profile-pic-js");
	}).mouseleave(function(){
		$(this).parent().siblings().children().children().removeClass("wiggler");
		$(this).children(".card-image").children().removeClass("profile-pic-js");

	});

	// $(".modal-footer .btn-flat").keypress(function(event){
		// if (event.which == 13) {
		// 	alert("hey");
		// }
	// });

	// $(".modal-footer .btn-flat").on("click", function(){
	// 	alert("hey");
	// });


	// Upon clicking any of the modal 3 references. Empty the story p tag and reappend the story tag to apply the typerwrite effect.
	$(".empty-typewriter-text").one("click",function(){

		$("#modal3 p").empty()
			.append("<p>What is Lorem Ipsum? <br><br> Lorem Ipsum is simply dummy text of the printing and typesetting " +
				"industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an " +
				"unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived " +
				"not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " +
				"It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and " +
				"more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br>" +
				"<br><br>" +
				"Why do we use it?" +
				"<br><br>" +
				"Lorem Ipsum is simply dummy text of the printing and typesetting " +
				"industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an " +
				"unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived " +
				"not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " +
				"It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and " +
				"more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>");

	});

	$(".topwrapper .type-it-text").one("click", function(){

		$('.type-it').typeIt({
			startDelay: 3000,
			deleteSpeed: 50,
			lifeLike: true,
			loop: true,
			loopDelay: 2000,
		})
		.tiType("Maybe Technology?")
		.tiPause("5000")
		.tiDelete(17)
		.tiPause("1000")
		.tiType("We recommend checking out Cohorts Helping Cohorts within Austin, Texas.")
		.tiPause("5000")
		.tiDelete(71)
		.tiType("But you know their")
		.tiPause(500)
		.tiDelete(2)
		.tiType("re's always Englsh")
		.tiDelete(6)
		.tiType("English Literature.")
		.tiPause("5000")
		.tiDelete(47)
		.tiPause("1000")
		.tiType('Maybe try out that "Games" tag below.')
		.tiPause("5000")
	});

});