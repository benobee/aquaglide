import controller from "../core/controller";
import quivers from "../modules/quivers";
import { dom } from "../modules/dom";
import product from "../modules/product";

/**
 * @example
 * controller.on("navbar", (el) => {
 *   navbar.init();
 * });
 */

const api = () => {
    // mobile nav
    controller.on("navigation", () => {
        // init quivers with geo location
        quivers.init();
        // cart related events
        const body = document.querySelector("body");

        dom(".Cart").on("click", (e) => {
            e.stopPropagation();
            body.classList.toggle("cart-open");
        });
        // click anywhere on body to hide quivers hover cart
        dom("body").on("click", () => {
            body.classList.remove("cart-open");
        });
    });

    // Loader Splash screen with logo
    controller.on("loader", (el) => {
        // loader screen on home page
        setTimeout(() => {
            el.classList.add("hide");
        }, 150);
    });

    // product page events
    controller.on("product-page", (el) => {
        // product.init(el);
        product.init(el);
    });
};

export default api;