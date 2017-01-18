/**
 *
 * @public
 * @namespace navbar
 * @description handles all additional event bindings or injected elements
 *
 */

import $ from 'jquery';

const navbar = {
	init(){
		this.injectSocialIcons();
		this.hideMobileBrandOnScroll();
	},
	hideMobileBrandOnScroll(){
		const brand = $('.mobile-branding-wrapper');

		if(brand.length == 0){
			return false;
		}

		$(window).on("scroll", (e) => {
			let scroll = $('body').scrollTop();

			if(scroll <= 37){
				$(brand).removeClass('active-scrolling');
			} else {
				$(brand).addClass('active-scrolling');
			}
		});

	},
	injectSocialIcons(){
		const socialIcons = $('.socialaccountlinks-v2-block .sqs-block-content').clone();

		const nav = $('#secondaryNavWrapper');

		const target = $(nav).find('.site-navigation');

		$(target).after(socialIcons);

		$(nav).find('.sqs-block-content').addClass('social-top-nav');
	}
}

export default navbar;