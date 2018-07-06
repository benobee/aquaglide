import * as core from "./src/modules/index.js";
import $ from "jquery";

/**
 * @public
 * @namespace App
 * @description constructs and initializes all core modules
 */

class App_Build {
    constructor () {
        this.runModules();
    }
    runModules () {
        /* wait for window to load */
        $(window).on("load", () => {
            core.animation.init();
        });
        /* wait until document is ready */
        $(document).ready(() => {
            core.product.init();
            core.filters.init();
            core.cart.init();
            core.geo.init();
        });
    }
}

const App = new App_Build();

export default App;