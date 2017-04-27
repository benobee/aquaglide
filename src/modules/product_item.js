/**
 *
 * @public
 * @namespace product
 * @description handles all carousels, events on single product view
 *
 */

import $ from "jquery";
import 'owl.carousel';

const product = {
    init(){
        this.focalPoints();
        this.rotateBannerImages();
        this.productCarousel();
        this.toggleMedia();

    },
    toggleMedia(){
        /* media toggle between 2D and 3D */
        $('.Product').find('.media-toggle .ui').on("click", (e) => {
            $(e.currentTarget).toggleClass("active");
            $('.media-wrapper .slide').toggleClass("active");
        });
    },
    rotateBannerImages(){
        /* rotate product banner images*/
        const owl = $('#product-banner-images');
        
        owl.length > 1 ? true : false;

        $(owl).owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            mouseDrag: false,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            autoplayTimeout:5000
        });
    },
    productCarousel() {
        /* main product image carousel */
        const owl = $('#product-images');

        owl.length !== 0 ? true : false;

        $(owl).owlCarousel({
            items: 1,
            autoplay: false,
            loop: true,
            margin:0,
            mouseDrag: true,
            animateIn: 'fadeIn',
            autoplayHoverPause:true,
            autoplayTimeout: 6000,
            nav: false,
            dots: true,
            animateOut: 'fadeOut',
            onInitialized(){
                let totalItems = $('.thumbs .thumb').toArray();

                if(totalItems.length <= 1){
                    $('.Product').addClass('has-one-image');
                }
                //click next
                $('.product-images .controls.main .next').on('click', (e) => {
                    e.stopPropagation();
                    owl.trigger('next.owl.carousel', [500]);         
                });
              
                //click prev
                $('.product-images .controls.main .prev').on('click', (e) => {
                    e.stopPropagation();
                    // With optional speed parameter
                     // Parameters has to be in square bracket '[]'
                    owl.trigger('prev.owl.carousel', [500]);
                });

                $('.thumbs .thumb').on("click", (e) => {
                    let thumbId;
                    thumbId = $(e.currentTarget).data('id');

                    let index = Number(thumbId) - 1;

                    $(owl).trigger('to.owl.carousel', [index]);
                });

                product.thumbCarousel(totalItems.length);
            }
        });
  },
  thumbCarousel(imageCount){
    /* product thumb image carousel options */
        let isActive = false;

        if(imageCount <= 6){
            $('.thumb-wrapper').addClass('hide-controls');
            isActive = true;
        }

        const owl = $('.thumbs.owl-carousel');

        owl.length !== 0 ? true : false;

        $(owl).owlCarousel({
            items: 6,
            autoplay: false,
            loop: false,
            margin:0,
            stagePadding:0,
            rewind:false,
            slideBy:1,
            autoplayHoverPause:true,
            mouseDrag: true,
            autoplayTimeout:4000,
            nav: false,
            callbacks:true,
            dots: false,
            onInitialized(){
                //click next
                $('.product-images .controls.thumb .next i').on('click', (e) => {
                    e.stopPropagation();
                    owl.trigger('next.owl.carousel', [500]);         
                });
              
                //click prev
                $('.product-images .controls.thumb .prev i').on('click', (e) => {
                    e.stopPropagation();
                    // With optional speed parameter
                     // Parameters has to be in square bracket '[]'
                    owl.trigger('prev.owl.carousel', [500]);
                });
            }
        });
  },
  convertToPercent(number){
      return number * 100;
  },
  focalPoints(){
    /* set user defined focal points from SQS editor*/
    let array = $('.owl-carousel .image').toArray();

    $.each(array, (i, item) => {
        let x = 0;
        let y = 0;

        let focalPoint = $(item).data('image-focal-point');

        if(focalPoint !== undefined){
            let split = focalPoint.split(',');

            x = Math.floor(this.convertToPercent(split[0])) + '%';
            y = Math.floor(this.convertToPercent(split[1])) + '%';

            let position = String(x + ' , ' + y);

            let imageSource = $(item).data('image');

            $(item).css({
               'backkground-image' : 'url(' + imageSource + ')',
               'background-position-x' : x,
               'background-position-y' : y
            });            
        }   

    });       
  }
};

export default product;