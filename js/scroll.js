$(function(){
	var animating = false;
	var lastId,
		topMenu = $(".menu"),
		// All list items
		menuItems = topMenu.find("a").add($('.mbl-menu').find('a')),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
		animating = true;
	  var href = $(this).attr("href"),
		  offsetTop = href === "#" ? 0 : $(href).offset().top+1;
	  $('html, body').stop().animate({ 
		  scrollTop: offsetTop
	  }, 1500, 'easeInQuint', function(){
		  animating = false;
	  });
	  e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
	  if (animating === false) {
	   // Get container scroll position
	   var fromTop = $(this).scrollTop();
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
		 if ($(this).offset().top < fromTop)
		   return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "intro";
	   if (lastId !== id) {
		   lastId = id;
		   // Set/remove active class
		   menuItems
			 .removeClass("selected")
			 .filter("[href=#"+id+"]").addClass("selected");
	   }                   
	}});
});