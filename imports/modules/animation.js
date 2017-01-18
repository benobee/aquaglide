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
	},
	add(){
	    //home page
	    setTimeout(function(){
	        $('.loaderWrapper').addClass("hide");
	    }, 150);

	    $('.product-images').addClass('is-initialized');
	    $('.spinner-wrapper').addClass('is-loaded');
    }
};

export default animation;
