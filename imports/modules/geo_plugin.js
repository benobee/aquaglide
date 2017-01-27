/**
 *
 * @public
 * @namespace Geo
 * @description detect geo location using geo_plugin script in head.
 * Chance location specific options for product page buy button.
 *
 */

const Geo = {
	init(){
		/*get state of element*/
		this.isActive();

		/* if DOM element is on page run scripts*/
		if(!this.state){
			return false;
		}

		this.cacheDOM();
		this.geoQuery();
		this.addActiveDOMClasses();

	},
	isActive(){
		/* check to see if DOM element is on page */

		let productPage = $('.Product');

		let isActive = productPage.length ? true : false;

		this.state = isActive;
	},
	geoQuery(){
		/* get users country location returned as country code
			using geo plugin script in HEAD
		*/

		let query = '';
		
		query = geoplugin_countryCode();

		this.query = query;
	},
	cacheDOM(){
		/* cache dom */

		const productPage = $('.Product');

		this.actions = productPage.find('.product-actions');
		this.button = productPage.find('.product-buy a');
	},
	addActiveDOMClasses(){
		/* add active class for CSS styling and country data attribute */

		$(this.actions[0]).addClass('geo-data-active').attr('data-country', this.query);
	}
}

export default Geo;