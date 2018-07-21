import controller from "./core/controller";
import api from "./api/api";

const App = {
    init () {
        this.api = api();
        this.registerAPIControllers();
    },

    /**
     * events are bound to the controller when
     * elements are found within the DOM.
     */
    registerAPIControllers () {
        controller.watch([{
            name: "navigation",
            el: "body"
        }, {
            name: "loader",
            el: ".loaderWrapper"
        }, {
            name: "product-page",
            el: ".Product"
        }]);
    }
};


// on dom content load
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});