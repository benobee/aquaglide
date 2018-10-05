import axios from "axios";
import PubSub from "../core/pubsub";

/**
 * @public
 * @namespace Geo
 * @description detect geo location using geo_plugin script in head.
 * Chance location specific options for product page buy button.
 */

const events = new PubSub();
const quivers = {
    init () {
        this.geoQuery();
        this.events();
    },
    events () {
        events.on("marketplaceProcessed", (data) => {
            this.data = data;
            if (data.marketplace) {
                document.querySelector("body").classList.add("marketplace-active");
                this.loadCart(data.marketplace);
            }

            const productPage = document.querySelector(".Product");

            if (productPage) {
                events.emit("productPageFound", data);
            }
        });
    },
    getGEOData (callback) {
        events.on("productPageFound", (data) => {
            callback(data, data.error);
        });
    },
    loadCart (marketplace) {
        const script = document.createElement("script");

        script.type = "text/javascript";
        script.src = `https://hovercart.quivers.com/?Marketplace=${marketplace}`;
        script.async = "true";

        document.querySelector("head").appendChild(script);
        events.emit("cartLoaded");
    },
    /*
     *  @desc get users country location returned as country code
     *	using geo plugin script in HEAD
     */
    geoQuery () {
        const request = axios.get("https://ipinfo.io/json", {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate"
            },
            params: {
                token: "d3cd176decd4e9"
            }
        });

        request.then((response) => {
            let marketplace = "";

            switch (response.data.country) {
                case "US":
                    marketplace = "d011d2c7-0e0d-4905-9f47-57cc0cd923b6";
                    break;
                // case "CA": marketplace = "d011d2c7-0e0d-4905-9f47-57cc0cd923b6"; break;
                default:
                    marketplace = "";
            }

            if (marketplace.length > 0) {
                events.emit("marketplaceProcessed", {
                    marketplace,
                    country: response.data.country,
                    error: null,
                    state: response.data.region
                });
            } else {
                events.emit("marketplaceProcessed", {
                    marketplace: null,
                    country: response.data.country,
                    error: "ERROR: No Marketplace Found or location not approved."
                });
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }
};

export default quivers;