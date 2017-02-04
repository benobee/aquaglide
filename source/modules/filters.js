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
        this.render();

        //bind events
        this.events();

    },
    cacheDOM(){
        this.grid = $('.Product-list');
        this.items = $(this.grid).find('.item').toArray();
    },
    getTags(array){
        let tags = [];

        _.each(array, (item, index) => {
            let tag = $(item).data('tag');
            //get tags and push to array
            tag = tag.replace(/\./g, "").replace(/-/g, " ").split(',');

            _.each(tag, (i) => {
                tags.push(i);
            });

        });

        tags = _.sortBy(tags);
        tags = _.uniq(tags, true);

        return tags;
    },
    mapArray(){
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
        array.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
        return array;
    },
    renderTags(){
        this.tags = this.getTags(this.items);

        $.each(this.tags, (i) => {
            let filter = this.tags[i].replace(/ /g, "-");

            $('#tag-render').append('<div class="category-select '+ filter +'" data-filter="tag-'+ filter +'">' + this.tags[i] + '</div>');
        });
    },
    filterByCategory(filterName){
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
        let filter = window.location.hash;

        filter = this.formatHash(filter);

        this.makeButtonActive('.' + filter);
        this.filterByCategory('tag-' + filter);
    },
    formatHash(hash){
        hash = this.slugify(hash);

        return hash.replace('#', '');
    },
    makeButtonActive(hash){
        let target = $('.category-select-wrapper').find(hash);

        $(target[0]).addClass('active');
    },
    slugify: function(filterName){
        return filterName.toLowerCase().replace(/ /g, "-").replace(/-&-/g, "-");
    },
    clearRenderTargetArea(){
        $(this.grid).html('');
    },
    render(){
        this.mapArray();
        this.checkHash();
        this.clearRenderTargetArea();

        $.each(this.items, (i) => {
            $(this.grid).append(this.items[i].dom);
        });

        //show grid
        $(this.grid).addClass('is-initialized');
    },
    events(){
        window.onhashchange = null;

        $(window).on("hashchange", (e) => {
            e.preventDefault();
        });

        //click filter button
        $('.category-select').on("click", (e) => {
            //e.preventDefault();

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