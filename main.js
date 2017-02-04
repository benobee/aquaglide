/**
 *
 * @public
 * @namespace App
 * @description constructs and initializes all core modules
 *
 */

import * as core from "./source/modules/index.js";
import $ from "jquery";

/* compile all less files from ./stylesheets */
const css = require("./main.less");

class App_Build {
    constructor() {
    	this.runModules();
    }
    runModules(){
        /* wait for window to load */
        $(window).on("load", (e) => {
            core.animation.init();
        });
        /* wait until document is ready */
        $(document).ready(() => {
            core.navbar.init();
            core.product.init();
            core.filters.init();
            core.cart.init();
            core.geo.init();
        });
    }
};

const App = new App_Build();
