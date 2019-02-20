import controller from "./core/controller";
import api from "./api/api";
import getImageLoader from "./modules/imageLoader";

const App = {
	init () {
		api();
		this.registerAPIControllers();
		this.imageLoader = getImageLoader("#content");
	},

	/**
     * events are bound to the controller when
     * elements are found within the DOM.
     */
	registerAPIControllers () {
		controller.watch([
			{
				name: "navigation",
				el: "body"
			},
			{
				name: "loader",
				el: ".loaderWrapper"
			},
			{
				name: "product-page",
				el: ".Product"
			},
			{
				name: "ag-index",
				el: ".collection-type-ag_index"
			}
		]);
	}
};

// on dom content load
document.addEventListener("DOMContentLoaded", () => {
	App.init();
});
