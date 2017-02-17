/**
 *
 * @public
 * @namespace animation
 * @description initializes elements tha need to wait for page or window
 * to load for smooth transitions.
 *
 */

import $ from "jquery";

const animation = {
	init(){
		this.add();
		this.events();
	},
	add(){
	    /* loader screen on home page */
	    setTimeout(() => {
	        $('.loaderWrapper').addClass("hide");
	    }, 150);

	    $('.product-images').addClass('is-initialized');
	    $('.spinner-wrapper').addClass('is-loaded');
    },
    events(){
    	/*click on homepage SEE Products*/
    	$('.page-description a').on("click", (e) => {
    		e.preventDefault();

	        let target = $('#collection-header-58791853d1758edfdf7e5ec2');

			$('html, body').animate({
          		scrollTop: target.offset().top
        	}, 400);		
    	})
    }
};

export default animation;
