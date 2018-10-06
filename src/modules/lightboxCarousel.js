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

        setTimeout(() => {
            document.querySelector(".Product").classList.add("media-interaction-open");
        }, 400);

        document.querySelector(".Lightbox-carousel__close").addEventListener("click", () => {
            self.close();
        });

        return slider;
    },
    close () {
        document.querySelector("#Lightbox-carousel").classList.remove("active");
        document.querySelector(".Product").classList.remove("media-interaction-open");
    }
};

export default lightboxCarousel;