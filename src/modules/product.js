import LightboxCarousel from "./lightboxCarousel";
import { tns } from "tiny-slider/src/tiny-slider.module.js";
import quivers from "./quivers";
import { CALIFORNIA_LONG, UNITED_STATES_SHORT } from "../common/constants";

// product page methods
const product = {
    init () {
        this.cacheDOM();
        this.initializeProductCarousel();
        this.formatSpecs();
        quivers.getGEOData((data, error) => {
            // show warning for users in California
            if (data.state === CALIFORNIA_LONG) {
                this.addCaliforniaCancerWarning();
            }
            this.handleAddToCartButtons(data);
            if (error) {
                console.error(error);
            }
        });
        this.bindEvents();
    },
    cacheDOM () {
        this.productPage = document.querySelector(".Product");
        this.ui = document.querySelector(".media-toggle .ui");
        this.specsContainer = document.querySelector(".product-specs");
        this.specs = document.querySelectorAll(".product-specs p");
    },
    bindEvents () {
        //bind listener to make lightbox carousel visible on click
        this.carousel.addEventListener("click", () => {
            const activeItemIndex = document.querySelector(".media-content .tns-slide-active")
                .dataset.id;

            if (!this.carouselCreated) {
                const clone = this.productPage.querySelector(".Product__media").cloneNode(true);
                const items = clone.querySelectorAll("img");

                this.lightbox = new LightboxCarousel(items);
                this.lightbox.open(activeItemIndex);
            } else {
                this.lightbox.open(activeItemIndex);
            }
            this.carouselCreated = true;
        });

        /* media toggle between 2D and 3D */
        if (this.ui) {
            this.ui.addEventListener("click", (e) => {
                e.currentTarget.classList.toggle("active");
                document
                    .querySelector(".Product__media")
                    .classList.toggle("secondary-media-active");
            });
        }
    },
    addCaliforniaCancerWarning () {
        this.productPage.classList.add("product-warning");
    },
    handleAddToCartButtons (data) {
        const actions = this.productPage.querySelector(".Product__actions");

        if (data.country !== UNITED_STATES_SHORT) {
            actions.classList.add("outside-bounds");
            const button = document.createElement("div");
            const link = document.createElement("a");
            const target = actions.querySelector(".product-info");

            button.classList.add("product-buy");
            link.href = "https://www.aquaglide.com/dealers";
            link.innerText = "Find A Dealer";

            button.appendChild(link);
            target.appendChild(button);
        } else {
            actions.classList.add("active-marketplace");
            actions.dataset.dataMarketplace = data.marketplace;
            actions.classList.add("geo-data-active");
            actions.dataset.dataCountry = data.country;
        }
    },
    formatSpecs () {
        const ul = document.createElement("ul");

        ul.classList.add("specs-list");
        this.specs.forEach((item) => {
            item.innerText = item.innerText.replace("● ", "").replace("●", "");

            const text = item.innerText;

            const li = document.createElement("li");

            li.classList.add("specs-list__item");
            li.innerHTML = text;
            ul.appendChild(li);
        });
        this.specsContainer.innerHTML = ul.outerHTML;
    },
    initializeProductCarousel () {
        const main = tns({
            container: ".Product__media .main",
            items: 1,
            autoplay: false,
            mouseDrag: true,
            nav: false,
            navAsThumbnails: true,
            controlsText: [
                "<i class='fas fa-chevron-left fa-2x'></i>",
                "<i class='fas fa-chevron-right fa-2x'></i>"
            ]
        });
        const totalItems = document.querySelectorAll(".thumbs .item-thumb");

        // add class to make media visible
        document.querySelector(".Product__media").classList.add("is-initialized");

        if (totalItems.length === 1) {
            document.querySelector(".Product").classList.add("has-one-image");
        }
        this.carousel = document.querySelector(".media-content .tns-carousel");
        return {
            main
        };
    }
};

export default product;
