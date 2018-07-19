import controller from "../core/controller";
import quivers from "../modules/quivers";
import product from "../modules/product";

/**
 * @example
 * controller.on("navbar", (el) => {
 *   navbar.init();
 * });
 */

const api = () => {
    // mobile nav
    controller.on("navigation", (el) => {
        // init quivers with geo location
        quivers.init();

        // cart related events
        const cart = el.querySelector(".Cart");
        const body = document.querySelector("body");

        /* toggle quivers cart in nav */
        cart.addEventListener("click", (e) => {
            e.stopPropagation();
            body.classList.toggle("cart-open");
        });
        /* click anywhere on body to hide quivers hover cart*/
        body.addEventListener("click", () => {
            body.classList.remove("cart-open");
        });
    });

    // Loader Splash screen with logo
    controller.on("loader", (el) => {
        /* loader screen on home page */
        setTimeout(() => {
            el.classList.add("hide");
        }, 150);
    });

    // product page events
    controller.on("product-page", (el) => {
        product.init(el);
    });
};

export default api;