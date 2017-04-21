(function($){
	"use strict";
	
		/**
		 *  mobile menu
		 */
		
			$('.js-mbl-button').click(function(){
				if ($('.js-mbl-menu').is(':visible')){
					$('.js-mbl-menu').fadeOut();
				} else{
				$('.js-mbl-menu').fadeIn();
				}
			});
			$('.js-mbl-menu a').click(function(){
				$('.js-mbl-menu').fadeOut();
			});
		
		
		/**
		 *  nice scroll
		 */
		$("html").niceScroll();
		
		/**
		 * fixed background
		 */
		$('.cbp-so-scroller').each(function(){
			new cbpScroller( this );
		});
		
		/**
		 *  loader line
		 */
		$('.js-loader-line-init').each(function(){
			var plus = $(this).find('.plus').first();
			var minus = $(this).find('.minus').first();
			var line = $(this).find('.load-inner-line').first();
			var valDisplay = $(this).find('.input-amount');
			var maxVal = valDisplay.data('maxval');
			var valStep = valDisplay.data('valstep');

			valDisplay.val(maxVal);
			line.css({width: '100%'});
			plus.click(function(){
				var nextVal = parseInt(valDisplay.val(),10) + parseInt(valStep, 10);
				if (nextVal > maxVal){
					nextVal = maxVal;
				}
				valDisplay.val(nextVal);
				line.css({
					width: Math.round((nextVal/maxVal)*100) + '%'
				});
			});
			minus.click(function(){
				var nextVal = parseInt(valDisplay.val(),10) - parseInt(valStep,10);
				if (nextVal < 0){
					nextVal = 0;
				}
				valDisplay.val(nextVal);
				line.css({
					width: Math.round((nextVal/maxVal)*100) + '%'
				});
			});

			valDisplay.on("change keyup paste", function(){
				var newValue = $(this).val();
				if (!(/^[0-9]+$/).test(newValue) || newValue > maxVal){
					newValue = maxVal;
					valDisplay.val(newValue);
				}
				if ((parseInt(newValue, 10) + '').length !== newValue.length){
					valDisplay.val(parseInt(newValue, 10));
				}
				line.css({
					width: Math.round((newValue/maxVal)*100) + '%'
				});
			});
			var round = parseInt(valDisplay.data('round'), 10);
			line.parent().click(function(event){
				var newValue = Math.round(maxVal * (event.offsetX/$(this).width()));
				if (round){
					newValue = Math.round(newValue / round)*round;
				}
				valDisplay.val(newValue);
				line.css({
					width: Math.round((newValue/maxVal)*100) + '%'
				});
			});
		});
		
		/**
		 *  animated list
		 */
		$('.js-animated-list').each(function(){
			var cont = $(this);
			var items = cont.children('.animated-list-item');
			items.each(function(){
				var item = $(this);
				item.children('.animated-list-title').click(function(){
					var itemHasClass= item.hasClass('selected');
					items.removeClass('selected');
					items.find('.animated-list-body').stop(true,true).hide();
					if (!itemHasClass){
						item.find('.animated-list-body').slideDown();
						item.addClass('selected');
					}
				});
			});
		});
		
		/**
		 *  mobile slider
		 */
		$(window).resize(function(){
			if ($(this).width() > 720){
			 $('.services_cont_slider').css('margin-left',0);
			 window.paralaxSliderDisable = true;
			}else{
			 window.paralaxSliderDisable = false;
			}
		   });
		$(function(){
			$(window).resize();
			$('.services_cont_slider').parallaxSlider({
				speed_cont: 800,
				SEL_paging: '#service_paging'
			});
		});
		
		/**
		 *  counters
		 */
		$(window).scroll( function(){
			$('.getaloan-cont').each( function(i){

				var bottom_of_object = $(this).offset().top;
				var bottom_of_window = $(window).scrollTop() + $(window).height();
				if( bottom_of_window > bottom_of_object ){

					$('#counter-1').countTo({
						from: 0,
						to: $('#counter-1').data('countto'),
						speed: 1500,
						refreshInterval: 30,
						onComplete: function(value) {
						}
					});
					$('#counter-2').countTo({
						from: 0,
						to: $('#counter-2').data('countto'),
						speed: 1500,
						refreshInterval: 30,
						onComplete: function(value) {
						}
					});
					$('#counter-3').countTo({
						from: 0,
						to: $('#counter-3').data('countto'),
						speed: 1500,
						refreshInterval: 30,
						onComplete: function(value) {
						}
					});
					$('#counter-4').countTo({
						from: 0,
						to: $('#counter-4').data('countto'),
						speed: 1500,
						refreshInterval: 30,
						onComplete: function(value) {
						}
					});

					$(this).find('[id*="counter-"]').attr('id', '');
				}
			}); 
		});
	
})(jQuery);


