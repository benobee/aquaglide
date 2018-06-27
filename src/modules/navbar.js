import $ from "jquery";

/**
 * @public
 * @namespace navbar
 * @description handles all additional event bindings or injected elements
 */

const navbar = {
    init () {
        this.injectSocialIcons();
        this.hideMobileBrandOnScroll();
    },
    hideMobileBrandOnScroll () {
        /* hide the logo when on mobile when not at the top */
        const brand = $(".mobile-branding-wrapper");

        if (brand.length === 0) {
            return false;
        }

        $(window).on("scroll", () => {
            const scroll = $("body").scrollTop();

            if (scroll <= 37) {
                $(brand).removeClass("active-scrolling");
            } else {
                $(brand).addClass("active-scrolling");
            }
        });
        return true;
    },
    injectSocialIcons () {
        /* look for social icons in footer and append into main nav */
        const socialIcons = $("#footer-blocks .socialaccountlinks-v2-block .sqs-block-content").clone();
        const nav = $("#secondaryNavWrapper");
        const target = $(nav).find(".site-navigation");

        $(target).after(socialIcons);
        $(nav).find(".sqs-block-content").addClass("social-top-nav");
    }
};

export default navbar;