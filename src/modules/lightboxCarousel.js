import { tns } from "tiny-slider/src/tiny-slider.module.js";

/**
 * Carousel component
 * @param  {Object} data for the component
 * @return {Object} Vue component config
 * @private
 */

class LightboxCarousel {
    constructor (items) {
        this.instance = this.getInstance();
        this.listWrapper = document.createElement("ul");
        this.listWrapper.classList.add("Lightbox-carousel__list");
        this.inject = this.instance.querySelector(".Lightbox-carousel__content");
        this.inject.appendChild(this.listWrapper);
        items.forEach((item) => {
            const li = document.createElement("li");
            const imageWrapper = document.createElement("div");

            li.classList.add("Lightbox-carousel__list-item", "item");
            item.classList.add("image");
            item.src = `${item.src.split("?")[ 0 ]}?format=2500w`;
            item.style.cssText = "";
            imageWrapper.classList.add("Lightbox-carousel__image-wrapper");
            imageWrapper.appendChild(item);
            li.appendChild(imageWrapper);
            this.listWrapper.appendChild(li);
        });
        document.getElementById("site").appendChild(this.instance);
        this.api = this.getAPI();
        this.parent = document.querySelector(".Product");
        this.el = document.querySelector("#lightbox-carousel");
        this.closeButton = this.instance.querySelector(".Lightbox-carousel__close");
        this.bindEvents();
        setTimeout(() => {
            document.querySelector(".Product").classList.add("media-interaction-open");
        }, 400);
        return this;
    }
    getAPI () {
        return tns({
            container: ".Lightbox-carousel__list",
            items: 1,
            autoplay: false,
            mouseDrag: true,
            nav: false,
            controlsText: [
                "<i class='fas fa-chevron-left fa-2x'></i>",
                "<i class='fas fa-chevron-right fa-2x'></i>"
            ]
        });
    }
    getInstance () {
        const lightboxConstruct = document.createElement("div");

        lightboxConstruct.innerHTML = `
			<div id="lightbox-carousel" class="Lightbox-carousel">
				<div class="Lightbox-carousel__close">✕</div>
				<div class="Lightbox-carousel__content"></div>
			</div>
        `;
        return lightboxConstruct.children[ 0 ];
    }
    open (index) {
        this.api.goTo(index);
        this.instance.classList.add("active");
        this.instance.querySelector(".Lightbox-carousel__content").classList.add("active");
    }
    close () {
        this.instance.classList.remove("active");
        this.parent.classList.remove("media-interaction-open");
        this.instance.querySelector(".Lightbox-carousel__content").classList.remove("active");
    }
    bindEvents () {
        this.closeButton.addEventListener("click", () => {
            this.close();
        });
    }
}

export default LightboxCarousel;
