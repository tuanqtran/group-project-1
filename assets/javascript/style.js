$(document).ready(function(){
	// Materialize: Required to use collapse the sideNav.
	$(".button-collapse").sideNav();
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

	// When hovering over the modal 4 creator cards, create a jelly effect to the other cards and brighten the chosen image. When the mouse leaves reset to normal.
	$(".linkAnimation").mouseover(function(){
		$(this).children().children().children().addClass("portfolio-icon-enlarge");
		$(this).siblings().children().children().children().addClass("portfolio-icon-shorten");
		$(this).parent().parent().siblings().children().addClass("profile-pic-js");
		$(this).parent().parent().parent().parent().siblings().children().children().addClass("wiggler")
		// console.log($(this).parent().parent().parent().parent().siblings().children().children().addClass("wiggler"));
	}).mouseleave(function(){
		$(this).children().children().children().removeClass("portfolio-icon-enlarge")
		$(this).siblings().children().children().children().removeClass("portfolio-icon-shorten");
		$(this).parent().parent().siblings().children().removeClass("profile-pic-js");
		$(this).parent().parent().parent().parent().siblings().children().children().removeClass("wiggler")
	});

	$(".profile-card").mouseover(function(){
		$(this).parent().siblings().children().children().addClass("wiggler")
		// console.log($(this).parent().parent().parent().siblings().children().children().addClass("wiggler"));
	}).mouseleave(function(){
		$(this).parent().siblings().children().children().removeClass("wiggler")
	});

	// $(".profile-card").one("mouseover", function(){
	// 	$(this).parent().siblings().children().children().addClass("wiggler")
	// }).one("mouseleave", function(){
	// 	$(this).parent().siblings().children().children().removeClass("wiggler")
	// });	

	// Upon clicking any of the modal 3 references. Empty the story p tag and reappend the story tag to apply the typerwrite effect.
	$(".empty-typewriter-text").on("click",function(){

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


});