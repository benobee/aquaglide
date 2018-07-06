import $ from "jquery";

/**
 * handles the Quivers hover cart toggling from the main nav
 */

const cart = {
    init () {
        $(".Cart a").on("click", (e) => {
            e.preventDefault();
        });
        /* toggle quivers cart in nav */
        $(".Cart").on("click", (e) => {
            e.stopPropagation();
            $("#QuiversRibbon, #secondaryNavWrapper").toggleClass("cart-open");
        });
        /* click anywhere on body to hide quivers hover cart*/
        $("body").on("click", () => {
            $("#QuiversRibbon, #secondaryNavWrapper").removeClass("cart-open");
        });
    }
};

export default cart;