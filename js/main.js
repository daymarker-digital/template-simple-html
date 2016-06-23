/*
*
*	Theme Name: Daymarker Skeleton Theme
*	Author: Daymarker Digital
*	Info: Main Scripts / Functions
*
*/

/*
==============================================================================================
MASTER FUNCTIONS
==============================================================================================
*/

$(window).load(function(){
	loaded();
});

$(document).ready(function(){
	main();
});
	
$(window).resize(function() {
	resized();
});

/*
==============================================================================================
LOADED
==============================================================================================
*/

function loaded() {
	
	// loading screen
	//Daymarker.loadingScreen( $("#loading-screen") ); // loading screen
				
} // loaded()

/*
==============================================================================================
MAIN 
==============================================================================================
*/

function main() {
	
	// push menu controls	
	//Daymarker.pushMenu( $("button.push-menu-trigger") ); 
	
	// scroll to 	
	//Daymarker.scrollToElement( $("button.back-to-top"), $("header"), 220 ); 
		
} // main()

/*
==============================================================================================
RESIZED
==============================================================================================
*/

function resized() {
	
	
} // resized()

/*
==============================================================================================
DAYMARKER THEME OBJECT
==============================================================================================
*/

var Daymarker = {
	
	// current version
	version : "1.0",
	
	// author credentials
	author : "Daymarker Digital",
	
	// cookies related functions
	cookies : {
		
		getAll : function(){
		
			console.log(document.cookie);			
		},
		
		create : function( $name, $value, $days ) {
			
			if ( $days ) {
				var date = new Date();
				date.setTime( date.getTime() + ( $days*24*60*60*1000 ) );
				var expires = "; expires=" + date.toGMTString();
			}
			
			else {
				var expires = "";
			}
			
			document.cookie = $name + "=" + $value + expires + "; path=/";
			
		},
		
		read : function( $name ) {
					var nameEQ = $name + "=";
					var ca = document.cookie.split(';');
					for( var i=0; i < ca.length; i++ ) {
						var c = ca[i];
						while ( c.charAt(0)==' ' ) c = c.substring( 1, c.length );
						if ( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length );
					}
					return null;
		},
		
		erase : function( $name ) {
			
			document.cookie = $name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
		
		}
		
	},
	
	// viewport related functions
	viewport : {
		
		getWidth : function() {
			
			return window.innerWidth;
			
		},
		
		getHeight : function() {
			
			return window.innerHeight;
			
		},
		
		scale : function( $element, $percentage ){
			
			var elementHeight = 0;
			var elementWidth = 0;
			var elementRatio = 0;
			var elementOrientation = "none";
			
			elementWidth = $element.outerWidth();
			elementHeight = $element.outerHeight();
			
			if ( $element && $percentage ) {
				
				setScale();
				
				$(window).resize(function() {
					setScale();
				});

			}
				
			function setScale() {
					
				if ( elementWidth > elementHeight ) {
					
					elementOrientation = "landscape";
					elementRatio = ( elementHeight / elementWidth );
					$element.addClass("landscape");
					$element.css({
						"width" : ( Daymarker.viewport.getWidth() * $percentage ) + "px",
						"height" : "auto"
					});
					
				} else if ( elementWidth == elementHeight )  {
					
					elementOrientation = "square";
					$element.addClass("square");
					$element.css({
						"width" : ( Daymarker.viewport.getWidth() * $percentage ) + "px",
						"height" : ( Daymarker.viewport.getWidth() * $percentage ) + "px"
					});
					
				} else {
					
					elementOrientation = "portrait";
					$element.addClass("portrait");
					elementRatio = ( elementWidth / elementHeight );
					$element.css({
						"width" : ( Daymarker.viewport.getHeight() * $percentage ) * elementRatio + "px",
						"height" : ( Daymarker.viewport.getHeight() * $percentage ) + "px"
					});
					
				}			
				
			} // setScale()
		
		}, // scale 
		
		match : function() {
			
			var newHeight;
			var element = $(".js-match-viewport");
			var offset = 0;
			var percentage = 1;
			var heightOptions = {
				"10" : 0.1,
				"20" : 0.2,
				"25" : 0.25,
				"30" : 0.3,
				"33" : 0.33,
				"40" : 0.4,
				"50" : 0.5,
				"60" : 0.6,
				"66" : 0.66,
				"70" : 0.7,
				"75" : 0.75,
				"80" : 0.8,
				"90" : 0.9,
				"100" : 1
			}
	
			setNewHeight( element );
	
			$(window).resize(function() {
			
				setNewHeight( element );
			
			});
	
			// Nested Functions
	
			function setNewHeight( $element ) {
		
				if ( $element ) {
			
					if ( $element.hasClass("with-offset-top") ) {
					
						offset = $element.offset().top; // gets offset height from top of document
					
					}
			
					if ( $element.hasClass("percentage") ) {
					
						percentage = heightOptions[ $element.data("percentage") ]; // gets percentage of viewport height $element is going to occupy
					
					}
			
					newHeight = ( Daymarker.viewport.getHeight() * percentage ) - offset;
						
					$element.css({ "height" : newHeight + "px" }); // sets new height via css
			
				} // if $element exists
				
			} // setNewHeight()
			
		}
		
	},
	
	// loading animation on page load
	loadingScreen : function( $loadingScreen ){
		
		$loadingScreen.addClass("loaded");
			
		$loadingScreen.one("webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd transitionend", function(event) {
			$("body").addClass("loading-complete");
			$(this).remove();
		});
				
	},
	
	// push menus
	pushMenu : function( $trigger ){
		
		var siteContainer = $("#site-container");
		var pushNavRight = $("#push-menu-right");
		var pushNavLeft = $("#push-menu-left");
	
		$trigger.on("click", function(event) {
			
			if ( $(this).hasClass("right") ) {
				
				siteContainer.toggleClass("pushed-left");
				pushNavRight.toggleClass("pushed-left");
				
			} else if ( $(this).hasClass("left") ) {
				
				siteContainer.toggleClass("pushed-right");
				pushNavLeft.toggleClass("pushed-right");
				
			} else {
				
				// do nothing
				
			}
			
		});	
		
	},
		
	// animatd scroll to
	scrollToElement : function( $trigger, $target, $speed ) {
		
		$trigger.on("click", function(event) {
			
			$('html, body').animate({ scrollTop: $target.offset().top }, $speed );
			
		});
		
	},
	
	// Shopify specific functions
	shopify : {
		
		cart : {
			
			debug : function(){
				
				// REMEMBER TO TOGGLE 'PRESERVE LOG' IN CHROME DEV TOOLS
              
              	// CART SUMMARY
              
              	var cartItemArray = [];
              	var cartItemCount = 0;
              	var cartItemName = "";
              	var cartItemVariant = "";
              	var cartItemVariantType = "";
              	var cartItemVariantID = 0;
              	var cartItemQuantity = 0;
              	var cartItemPrice = 0;
                            
                $(".cart-item").each(function(){

					cartItemName = $(this).data("details").itemName;
					cartItemVariantName = $(this).data("details").variantName;
					cartItemVariantType = $(this).data("details").variantType;
					cartItemVariantID = $(this).data("details").variantID;
					cartItemQuantity = $(this).data("details").quantity;
					cartItemPrice = $(this).data("details").price;   
                  
                    // ADD ATTRIBUTE INFO TO ARRAY
					cartItemArray[cartItemCount] = { "count" : cartItemCount,  "itemName" : cartItemName, "variantName" : cartItemVariantName, "variantType" : cartItemVariantType, "variantID" : cartItemVariantID, "quantity" : cartItemQuantity, "price" : cartItemPrice }; 
          
          			// INCREASE ITERATION COUNT
					cartItemCount++;
                  
                }); // each '.cart-item'
				
              	// ATTRIBUTES
              
              	var cartAttributeArray = [];
              	var cartAttributeCount = 0;
              	var cartAttributeName = "";
              	var cartAttributeType = "";
              	var cartAttributeValue = "";
              
			  	$("input.has-attribute").each(function(){
			  	
			  		cartAttributeName = $(this).attr("name");
			  		cartAttributeValue = $(this).val();
			  		cartAttributeType = $(this).attr('type');
			  		
                	// ADD ATTRIBUTE INFO TO ARRAY
                  	cartAttributeArray[cartAttributeCount] = { "count" : cartAttributeCount,  "attributeName" : cartAttributeName, "attributeVal" : cartAttributeValue, "type" : cartAttributeType }; 
          
          			// INCREASE ITERATION COUNT
					cartAttributeCount++;
                
                });
            
            	console.log("debugCart() [\n");
              
				// PRINT CART SUMMARY
              
              	console.log("Cart Summary:");
              
              	$.each(cartItemArray, function(index, val) {
			  		console.log("Count : " + val.count + "\nName : " + val.itemName + "\nVariant : " + val.variantName + "\nVariant Type : " + val.variantType + "\nVariant ID : " + val.variantID + "\nQuantity : " + val.quantity + "\nPrice : " + val.price);				   				    
                });
                  
				// PRINT CART ATTRIBUTES
              
              	console.log("Attributes:");
              	$.each(attributeArray, function(index, val) {
			  		console.log("Count : " + val.count + "\nName : " + val.attributeName + "\nValue : " + val.attributeVal + "\nType : " + val.type );				   				    
                });
                              
            	console.log("]");
								
			}, // debug()
			
			addTo : function(){
				
				var buyNowButton = $("button.buy-now");
				var itemVariantID, itemVariantPrice, itemVariantTitle, itemVariantAvailable, itemVariantType;
				var quantity = 1;

				buyNowButton.on("click", function(event) { 
					
					var $thisButton = $(this);
					
					if ( $thisButton.hasClass("ajax") ) {
						
						// FANCY ADD TO CART
						itemVariantID = $(this).data("details").variantID;
						itemVariantPrice = $(this).data("details").price;
						itemVariantTitle = $(this).data("details").variantName;
						itemVariantAvailable = $(this).data("details").variantAvailable;
						itemVariantType = $(this).data("details").variantType;
						
						// add variant and quantity to cart      
						CartJS.addItem( itemVariantID, quantity, {}, {

							"success": function(data, textStatus, jqXHR) {
								buttonUpdate();
			                },
              
			                "error": function(jqXHR, textStatus, errorThrown) {
								console.log('Error: ' + errorThrown + '!');
							}

						}); // CartJS.addItem()
						
						function buttonUpdate() {
            	
							$thisButton.text( "Added to Cart!" ).addClass( "added-to-cart" );
							$("#header").addClass( "updated" );
			              
			                setTimeout(resetButton, 1200);
			
			                function resetButton(){
			
								$thisButton.text( "Buy " + itemVariantTitle ).removeClass( "added-to-cart" );
								$("#header").removeClass( "updated" );
			                 	  
							} // resetButton()
              
						} // buttonUpdate()

					} else {
						
						// REGULAR ADD TO CART
						
					}
										
				} // on 'click'
				
			} // addTo()
			
		} // cart()
		
	} // shopify
	
}; // Daymarker Theme Javascript Object

/*
==============================================================================================
CAROUSELS
==============================================================================================
*/

function owlCarousels() {
			
	var carousel = $(".owl-carousel"); // carousel element
	
	var carouselSettings = []; // array to store different carousel settings
	
	// General Carousel Settings
	carouselSettings[0] = {		
		carouselType: "General Carousel Settings",
		slideDuration: 3000,
		slideTransitionSpeed: 550,
		items: 1,
		margin: 0,
		loop: false,
		nav: true,
		dots: false,
		autoPlay: false,
		pauseOnHover: true,
		centerSlides: true
	};
	
	// Single Property Carousel Settings
	carouselSettings[1] = {		
		carouselType: "Other Carousel Settings",
		slideDuration: 5000,
		slideTransitionSpeed: 550,
		items: 1,
		margin: 10,
		loop: true,
		nav: true,
		dots: false,
		autoPlay: true,
		pauseOnHover: true,
		centerSlides: true
	};
	
	//console.log(carouselSettings[0].carouselType + " " + carouselSettings[1].carouselType);
			
	if ( carousel.length > 0 ) {
			
		carousel.on('initialized.owl.carousel initialized.owl.carousel', function(event) {
				
			//console.log(event); // debugging
							
		});
		
		initializeCarousel( carousel );
			
	} // if carousel exists	
		
		
	// Nested Functions
		
	function initializeCarousel( $carousel ) {
								
		if ( $carousel.hasClass("single-property-gallery") ) {			// single property post initialization
			
			$carousel.owlCarousel({
				
				autoplayTimeout: carouselSettings[1].slideDuration,		// total time item is viewable before transition begins to next item
				smartSpeed: carouselSettings[1].slideTransitionSpeed,	// speed of transition between items
				items: carouselSettings[1].items,
				margin: carouselSettings[1].margin,
				loop: carouselSettings[1].loop,
				nav: carouselSettings[1].nav,
				dots: carouselSettings[1].dots,
				autoplay: carouselSettings[1].autoPlay,
				autoplayHoverPause: carouselSettings[1].pauseOnHover,
				center: carouselSettings[1].centerSlides,
				autoHeight: false,										// items must be set to '1'
				responsive: {
					0:{
						items: 3 
					},
					650:{
						items: 4 
					},
					1024:{
						items: 5
					},
					1360:{
						items: 7
					}
				}
				
			}); // owlCarousel()
			
		} else {
			
			$carousel.owlCarousel({										// default initialization
			
				autoplayTimeout: carouselSettings[0].slideDuration,		// total time item is viewable before transition begins to next item
				smartSpeed: carouselSettings[0].slideTransitionSpeed,	// speed of transition between items
				items: carouselSettings[0].items,
				margin: carouselSettings[0].margin,
				loop: carouselSettings[0].loop,
				nav: carouselSettings[0].nav,
				dots: carouselSettings[0].dots,
				autoplay: carouselSettings[0].autoPlay,
				autoplayHoverPause: carouselSettings[0].pauseOnHover,
				center: carouselSettings[0].centerSlides,
				autoHeight: false,										// items must be set to '1'
				responsive: {
					0:{
						items: 1 
					}
				}
								
			}); // owlCarousel()
			
		} // if else 	
							
	} // initializeCarousel( $carousel )
	
	
	$('.refreshCarouselTrigger').on("click", function() {
		
		console.log(".refreshCarouselTrigger clicked!");
		
	    carousel.trigger('refresh.owl.carousel');
	    
	});
	
	carousel.on('refreshed.owl.carousel', function(event) {
				
		console.log(event); // debuggin
							
	});
	
	console.log("owlCarousels() fired and is running v4.9");
		
} // owlCarousels()