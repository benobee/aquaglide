/**
 *
 * @public
 * @namespace cart
 * @description handles the Quivers hover cart toggling from the main nav
 *
 */

import $ from 'jquery';

const cart = {
	init(){
		/* toggle quivers cart in nav */
		$('.Cart').on("click", (e) => {
			e.stopPropagation();

			$('#QuiversRibbon, #secondaryNavWrapper').toggleClass('cart-open');

		});

		/* click anywhere on body to hide quivers hover cart*/
		$('body').on("click", (e) => {
			$('#QuiversRibbon, #secondaryNavWrapper').removeClass('cart-open');
		});
	}
}

export default cart;