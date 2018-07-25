import lightboxCarousel from "./lightboxCarousel";
import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";
import quivers from "./quivers";

// product page methods
const product = {
    init (el) {
        this.el = el;
        this.lightbox = {};
        this.bannerImages();
        this.productCarousel();
        this.toggleMedia();
        this.focalPoints();
        quivers.getGEOData((data, error) => {
            this.handleAddToCartButtons(data);
            if (error) {
                console.error(error);
            }
        });
    },
    handleAddToCartButtons (data) {
        const productPage = document.querySelector(".Product");
        const actions = productPage.querySelector(".Product__actions");

        if (data.country !== "US") {
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
    toggleMedia () {
        /* media toggle between 2D and 3D */
        const ui = document.querySelector(".media-toggle .ui");

        if (ui) {
            ui.addEventListener("click", (e) => {
                e.currentTarget.classList.toggle("active");
                document.querySelector(".Product__media").classList.toggle("secondary-media-active");
            });
        }
    },
    bannerImages () {
        const slider = tns({
            container: "#product-banner-images",
            items: 1,
            autoplay: true,
            loop: true,
            autoplayTimeout: 5000
        });

        return slider;
    },
    productCarousel () {
        const main = tns({
            container: ".Product__media .main",
            items: 1,
            autoplay: false,
            mouseDrag: true,
            nav: false,
            navAsThumbnails: true,
            controlsText: ["<i class='fas fa-chevron-left fa-2x'></i>", "<i class='fas fa-chevron-right fa-2x'></i>"]
        });

        const totalItems = this.el.querySelectorAll(".thumbs .item-thumb");

        // add class to make media visible
        this.el.querySelector(".Product__media").classList.add("is-initialized");
        // // find if one image and add class
        if (totalItems.length === 1) {
            this.el.querySelector(".Product").classList.add("has-one-image");
        }

        const carousel = this.el.querySelector(".media-content .tns-carousel");

        //activate the lightbox carousel
        this.lightbox = lightboxCarousel.activate({
            el: carousel,
            mainCarousel: main
        });

        //bind listener to make lightbox carousel visible on click
        carousel.addEventListener("click", () => {
            document.querySelector("#Lightbox-carousel").classList.add("active");
            const activeItemIndex = document.querySelector(".media-content .tns-slide-active").dataset.id;

            this.lightbox.goTo(activeItemIndex - 1);
        });

        return {
            main
        };
    },
    convertToPercent (number) {
        return number * 100;
    },
    focalPoints () {
        /* set user defined focal points from SQS editor*/
        const array = document.querySelectorAll(".banner-media-wrapper .tns-carousel .image");

        for (const i in array) {
            if (array[ i ] && (typeof array[ i ]) === "object") {
                const item = array[ i ];
                let x = 0;
                let y = 0;

                const focalPoint = item.dataset.imageFocalPoint;

                if (focalPoint) {
                    const split = focalPoint.split(",");

                    x = `${Math.floor(this.convertToPercent(split[ 0 ])) }%`;
                    y = `${Math.floor(this.convertToPercent(split[ 1 ])) }%`;
                    const imageSource = array[ i ].dataset.image;

                    item.style.backgroundImage = `url(${ imageSource })`;
                    item.style.backgroundPositionX = x;
                    item.style.backgroundPositionY = y;
                }
            }
        }
    }
};

export default product;