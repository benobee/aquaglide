import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";

/**
 * Carousel component
 * @param  {Object} data for the component
 * @return {Object} Vue component config
 * @private
 */

const lightboxCarousel = {
    activate () {
        const self = this;
        const slider = tns({
            container: ".Lightbox-carousel__wrapper",
            items: 1,
            autoplay: false,
            mouseDrag: true,
            nav: false,
            controlsText: ["<i class='fas fa-chevron-left fa-2x'></i>", "<i class='fas fa-chevron-right fa-2x'></i>"]
        });

        document.querySelector(".Lightbox-carousel__close").addEventListener("click", () => {
            self.close();
        });

        return slider;
    },
    close () {
        document.querySelector("#Lightbox-carousel").classList.remove("active");
    }
};

export default lightboxCarousel;