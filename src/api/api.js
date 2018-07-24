import controller from "../core/controller";
import quivers from "../modules/quivers";
import product from "../modules/product";
import { $ } from "../modules/dom";

/**
 * @example
 * controller.on("navbar", (el) => {
 *   navbar.init();
 * });
 */


$(".item").on("click", (e) => {
    console.log(e);
});

const api = () => {

    // mobile nav
    controller.on("navigation", () => {
        // init quivers with geo location
        quivers.init();

        // cart related events
        const cart = document.querySelectorAll(".Cart");
        const body = document.querySelector("body");

        for (const i in cart) {
            if (typeof cart[ i ] === "object") {
                /* toggle quivers cart in nav */
                cart[ i ].addEventListener("click", (e) => {
                    e.stopPropagation();
                    body.classList.toggle("cart-open");
                });
            }
        }

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