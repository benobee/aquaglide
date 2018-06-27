import $ from "jquery";

/**
 * responsible for product list view filtering. Checks hash and filters accordingly.
 */

const filters = {
    init () {
        const active = $(".Product-list");

        if (active.length === 0) {
            return false;
        }
        //cache DOM elements
        this.cacheDOM();
        //grid rendering
        this.mapArray();
        this.checkHash();
        this.clearRenderTargetArea();
        this.render();
        //bind events
        this.events();
        return this;
    },
    cacheDOM () {
        this.grid = $(".Product-list");
        this.items = $(this.grid).find(".item").toArray();
    },
    /**
     * sortable array options
     */
    mapArray () {
        const array = this.items.map((i, id) => {
            const item = {
                name: $(i).data("name"),
                dom: i,
                id: `id-${ id}`,
                category: $(i).data("category")
            };

            return item;
        });

        this.items = array;
    },
    /**
     * sort array by name
     * @param {Array} array the input array
     * @returns {Array} a sorted array
     */
    sortByName (array) {
        array.sort((first, next) => {
            if (first.name < next.name) {
                return -1;
            }
            if (first.name > next.name) {
                return 1;
            }
            return 0;
        });
        return array;
    },
    /**
     * sort array by specified filter
     * @param {String} filterName the string to filter the collection by
     */
    filterByCategory (filterName) {
        //clear all active filters
        $(".Product-list .item").removeClass("active-filter");
        $.each(this.items, (i) => {
            const selected = $(this.items[ i ].dom).hasClass(filterName);

            if (!selected) {
                $(this.items[ i ].dom).addClass("active-filter");
            }
        });
    },
    /**
     * ook at the hash on page load
     * and filter results accordingly
     */
    checkHash () {
        let filter = window.location.hash;

        filter = this.formatHash(filter);
        this.makeButtonActive(`.${ filter}`);
        this.filterByCategory(`tag-${ filter}`);
    },
    /**
     * change hash to slug
     * @param {String} hash the has in the url
     * @returns {String} hash
     */
    formatHash (hash) {
        hash = this.slugify(hash);
        return hash.replace("#", "");
    },
    /**
     * add active state to button
     * @param {String} hash based on the hash the corresponding button will be active
     */
    makeButtonActive (hash) {
        const target = $(".category-select-wrapper").find(hash);

        $(target[ 0 ]).addClass("active");
    },
    slugify (filterName) {

        /*
         * @desc slugify a string
         */
        return filterName.toLowerCase().replace(/ /g, "-").replace(/-&-/g, "-");
    },
    clearRenderTargetArea () {

        /*
         * @desc clear rendered grid
         */

        $(this.grid).html("");
    },
    render () {

        /*
         * @desc render items
         */

        $.each(this.items, (i) => {
            $(this.grid).append(this.items[ i ].dom);
        });
        //show grid
        $(this.grid).addClass("is-initialized");
    },
    events () {
        /*
         * @desc event handelers
         */
        window.onhashchange = null;
        $(window).on("hashchange", (e) => {
            e.preventDefault();
        });
        //click filter button
        $(".category-select").on("click", (e) => {
            $(".category-select-wrapper .nav-item").removeClass("active");

            $(e.currentTarget).addClass("active");

            let filter = $(e.currentTarget).data("filter");

            //filter items
            this.filterByCategory(filter);

            //change hash
            filter = filter.replace("tag-", "");

            location.hash = filter;
        });
    }
};

export default filters;