/**
 *
 * @public
 * @namespace filters
 * @description responsible for product list view filtering. Checks hash and filters accordingly.
 *
 */

import $ from 'jquery';
import _ from 'underscore';

const filters = {
    init(){
        const active = $('.Product-list');

        if (active.length == 0){
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

    },
    cacheDOM(){

        /* 
         * @desc cache product list
        */
       
        this.grid = $('.Product-list');
        this.items = $(this.grid).find('.item').toArray();
    },
    mapArray(){

        /* 
         * @desc sortable array options
        */
       
        let array = this.items.map((i, id) => {
            const item = {
                name: $(i).data('name'),
                dom: i,
                id: 'id-' + id,
                category: $(i).data('category')
            }

            return item;
        });

        this.items = array;
    },
    sortByName(array){

        /* 
         * @desc sort array by name
        */
       
        array.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
        return array;
    },
    filterByCategory(filterName){

        /* 
         * @desc sort array by specified filter
        */
       
        //clear all active filters
        $('.Product-list .item').removeClass('active-filter');

        $.each(this.items, (i) => {
            let selected = $(this.items[i].dom).hasClass(filterName);

            if(!selected){
                $(this.items[i].dom).addClass('active-filter');
            }
        });
    },
    checkHash(){

        /* 
         * @desc look at the hash on page load
         * and filter results accordingly
        */
       
        let filter = window.location.hash;

        filter = this.formatHash(filter);

        this.makeButtonActive('.' + filter);
        this.filterByCategory('tag-' + filter);
    },
    formatHash(hash){

        /* 
         * @desc change hash to slug
        */
       
        hash = this.slugify(hash);

        return hash.replace('#', '');
    },
    makeButtonActive(hash){

        /* 
         * @desc add active state to button
        */
       
        let target = $('.category-select-wrapper').find(hash);

        $(target[0]).addClass('active');
    },
    slugify(filterName){

        /* 
         * @desc slugify a string
        */
       
        return filterName.toLowerCase().replace(/ /g, "-").replace(/-&-/g, "-");
    },
    clearRenderTargetArea(){

        /* 
         * @desc clear rendered grid
        */
       
        $(this.grid).html('');
    },
    render(){

        /* 
         * @desc render items
        */
       
        $.each(this.items, (i) => {
            $(this.grid).append(this.items[i].dom);
        });

        //show grid
        $(this.grid).addClass('is-initialized');
    },
    events(){
        /* 
         * @desc event handelers
        */
       
        window.onhashchange = null;

        $(window).on("hashchange", (e) => {
            e.preventDefault();
        });

        //click filter button
        $('.category-select').on("click", (e) => {
            $('.category-select-wrapper .nav-item').removeClass('active');

            $(e.currentTarget).addClass('active');
         
            let filter = $(e.currentTarget).data('filter');

            //filter items
            this.filterByCategory(filter);

            //change hash
            filter = filter.replace('tag-', '');

            location.hash = filter;
        });
    }
};

export default filters;