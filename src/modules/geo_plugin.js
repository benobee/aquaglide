import $ from "jquery";

/**
 * @public
 * @namespace Geo
 * @description detect geo location using geo_plugin script in head.
 * Chance location specific options for product page buy button.
 */

const Geo = {
    init () {
        const productPage = this.checkProductPage();

        /* if DOM element is on page run scripts*/
        if (productPage) {
            this.cacheDOM();
            this.geoQuery();
        }
    },
    checkProductPage () {
        let productPage = $(".Product");

        if (productPage.length > 0) {
            productPage = true;
        }

        return productPage;
    },
    /*
     *  @desc get users country location returned as country code
     *	using geo plugin script in HEAD
     */
    geoQuery () {
        let marketplace = "";

        $.ajax({
            url: "https://ipinfo.io/json?token=d3cd176decd4e9",
            success: (data) => {
                switch (data.country) {
                    case "US":
                        marketplace = "d011d2c7-0e0d-4905-9f47-57cc0cd923b6";
                        break;
                        // case "CA": marketplace = "d011d2c7-0e0d-4905-9f47-57cc0cd923b6"; break;
                    default:
                        marketplace = "";
                }

                const productPage = this.checkProductPage();

                this.query = data.country;
                if (productPage) {
                    this.checkCountryCode(this.query);
                }
                if (marketplace.length > 0) {
                    if (productPage) {
                        $(this.actions[ 0 ]).addClass("active-marketplace").attr("data-marketplace", marketplace);
                    }
                    const script = document.createElement("script");

                    $(script).attr({
                        type: "text/javascript",
                        src: `https://hovercart.quivers.com/?Marketplace=${ marketplace}`,
                        async: "true"
                    });
                    $("head").append(script);
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    },
    /*
     * @desc check if one of the approved countries
     * and render either dealer button or quivers add
     * to cart button
     */
    checkCountryCode (country) {
        const isApproved = (country === "US");

        if (!isApproved) {
            this.renderDealerButton();
            $(".product-actions .product-price").remove();
        }
        this.addDOMClasses();
    },
    /*
     * @desc create a button to be rendered in place of
     * the add to cart button generated by quivers if
     * quivers id is in place
     */
    renderDealerButton () {
        $(this.actions[ 0 ]).addClass("outside-bounds");
        const link = document.createElement("a");

        link.setAttribute("href", "/dealers/");
        link.innerHTML = "Find A Dealer";

        $(".product-buy").html(link);
    },
    /* @desc cache dom */
    cacheDOM () {
        const productPage = $(".Product");

        this.actions = productPage.find(".product-actions");
        this.button = productPage.find(".product-buy a");
    },
    /* @desc add active class for CSS styling and country data attribute */
    addDOMClasses () {
        $(this.actions[ 0 ]).addClass("geo-data-active").attr("data-country", this.query);
    }
};

export default Geo;