import axios from "axios";
import PubSub from "../core/pubsub";
import {
    US_MARKETPLACE_ID,
    IPINFO_TOKEN,
    IPINFO_API,
    IPINFO_ERROR_MESSAGE,
    UNITED_STATES_SHORT,
    AUSTRALIA_SHORT,
    AUS_MARKETPLACE_ID
} from "../common/constants";
import { PRODUCT_NOT_FOUND, MARKETPLACE_PROCESSED } from "../common/pubSubEvents";

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
                events.emit(PRODUCT_NOT_FOUND, data);
            }
        });
    },
    getGEOData (callback) {
        events.on(PRODUCT_NOT_FOUND, (data) => {
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
        const request = axios.get(IPINFO_API, {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate"
            },
            params: {
                token: IPINFO_TOKEN
            }
        });

        request
            .then((response) => {
                let marketplace = "";

                switch (response.data.country) {
                    case UNITED_STATES_SHORT | "USA":
                        marketplace = US_MARKETPLACE_ID;
                        break;
                    case AUSTRALIA_SHORT | "AUS":
                        marketplace = AUS_MARKETPLACE_ID;
                        break;
                    default:
                        marketplace = "";
                }

                if (marketplace.length > 0) {
                    events.emit(MARKETPLACE_PROCESSED, {
                        marketplace,
                        country: response.data.country,
                        error: null,
                        state: response.data.region
                    });
                } else {
                    events.emit(MARKETPLACE_PROCESSED, {
                        marketplace: null,
                        country: response.data.country,
                        error: IPINFO_ERROR_MESSAGE
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

export default quivers;
