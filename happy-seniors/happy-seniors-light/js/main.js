(function($) {

  'use strict';

  var App = {

    /**
     * Run
     */
    run: function() {
      var func = Object.getOwnPropertyNames( App );
      $.each( func, function( i, v ) {
        if( v.indexOf('init') !== -1 ){
          App[v]();
        }
      });
    },

    /**
     * Feature
     */
    initFeature: function() {
      // accordion js
      var _accordion = $('#accordion');
      _accordion.on('shown.bs.collapse', function(){
        $(this).children('.panel').removeClass('active');
        $(this).find('.panel-collapse.in').parent().addClass('active');
      }).on('hidden.bs.collapse', function(){
        $(this).children('.panel').removeClass('active');
      });
    },

    /**
     * Homepage slide
     */ 
    initHome: function() {
      var swiper = new Swiper('.slide_header_home', {
        pagination: '.swiper-pagi-slide',
        paginationClickable: true,
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        autoplay: 3000
      });

      var swiperService = new Swiper('.swiper-services', {
          slidesPerView:3,
          pagination: '.swiper-pagi-service',
          paginationClickable: true,
          spaceBetween: 43,
          breakpoints: {
            // when window width is <= 480px
            640: {
              slidesPerView: 1
            },
            // when window width is <= 640px
            920: {
              slidesPerView: 2
            }
          }
      });

      var swiper2 = new Swiper('.swiper-singleday', {
        slidesPerView: 3,
        nextButton: '.swiper-single-next',
        prevButton: '.swiper-single-prev',
        spaceBetween: 30,
        breakpoints: {
          // when window width is <= 480px
          640: {
            slidesPerView: 1
          },
          // when window width is <= 640px
          920: {
            slidesPerView: 2
          }
        }
      });

       var swiper2 = new Swiper('.swiper-ft-singleday', {
        nextButton: '.swiper-ft-single-next',
        prevButton: '.swiper-ft-single-prev'
      });

      var swiper3 = new Swiper('.swiper-volunteer', {
        slidesPerView: 3,
        nextButton: '.swiper-volen-next',
        prevButton: '.swiper-volen-prev',
        spaceBetween: 30,
        breakpoints: {
          // when window width is <= 480px
          640: {
            slidesPerView: 1
          },
          // when window width is <= 640px
          992: {
            slidesPerView: 2
          }
        }
      });

      var _daily_swiper = new Swiper('.swiper-daily-acitvities', {
        slidesPerView: 1,
        nextButton: '.swiper-acti-next',
        prevButton: '.swiper-acti-prev',
        spaceBetween: 30
      });

      var testimonial = new Swiper('.swiper-testimonial',{
        slidesPerView: 1,
        autoplay: 5000,
        pagination: '.swiper-pagi-testinmonial',
        paginationClickable: true
      });

      var swiperService = new Swiper('.swiper-about', {
          slidesPerView:6,
          nextButton: '.swiper-about-next',
          prevButton: '.swiper-about-prev',
          spaceBetween: 0,
          breakpoints: {
            // when window width is <= 480px
            640: {
              slidesPerView: 2
            },
            // when window width is <= 640px
            992: {
              slidesPerView: 3
            },
            1170: {
              slidesPerView: 4
            },

          }
      });
      var galleryTop = new Swiper('.swiper-gallery-contract', {
          spaceBetween: 10,
          direction: 'vertical'
      });
      var galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 3,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
          direction: 'vertical',
          slidesPerView:4,
      });
      galleryTop.params.control = galleryThumbs;
      galleryThumbs.params.control = galleryTop;
      App.fixPositionThumbnail();

      // galleryTop.height = 358;
      $('.owl-carousel-about').owlCarousel({
        items:6,
        navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots:false,
        responsiveClass:true,
        responsive:{
          0:{
            items:2,
          },
          768:{
            items: 3,
          },
          992:{
            items: 4,
            nav:true
          },
          1200:{
            items:5,
            nav:true,
          },
          1600:{
            items:6,
            nav:true
          }
        }

      });

      $('.hs-testimonial').bxSlider({
        auto: true,
        controls:false,
        pager:false
      });

      // hover menu
      $("ul.nav li.dropdown").on({
          mouseenter: function () {
              $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
          },
          mouseleave: function () {
              $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
          }
      });


      // maps
      App.isnitializeMaps('maps', '42.118494', '-75.954495');
      // google.setOnLoadCallback( App.initializeMaps('maps', '42.118464', '-75.954465') );

      $(window).on('resize', function(){
        if( App.fixHei ){
          App.hsFixHeight();
        }
        App.fixPositionThumbnail();
        App.resizeTestiHeight();
      });
      $(window).on('load', function(){
        App.testimonialMember();
      });
    },
    initMixup: function(){
      var _mixup = $('#our-gallery');
      if(! _mixup.mixItUp('isLoaded') ){
        _mixup.mixItUp();
        $('.controls-filter').find('.filter').first().addClass('active');
      }
    },
    initIncremental: function(){
      var _increment = $('.incremental-counter');
      if( _increment.length === 0 ) return;
      _increment.each( function(){
        $(this).incrementalCounter({digits:'auto'});
      })
    },
    testimonialMember: function(){
      App._testi_member = $('#testi-member');
      if( App._testi_member.length === 0 ) return;
      App.resizeTestiHeight();
      var _testi_author = App._testi_member.find('.testi-author');
      _testi_author.on('click', 'a.bg-hv-overlay', function(e){
        e.preventDefault();
        var _this = $(this);
        App._testi_member.find('.testi-detail').fadeOut( function(){
          $(this).empty().append( _this.children('.author-opinion').html() ).fadeIn();
          _testi_author.find('.author-name').text( _this.data('name' ) ).fadeIn();
        })
      });
    },
    resizeTestiHeight: function(){
      if( ! App._testi_member ) return;
      if( $(window).width() > 768){
        App._testi_member.find('.relative-content').css('height', App._testi_member.find('.testi-author').height() );
      }
    },
    hsFixHeight:function(){
      var _element = $('.hs-equal-hei');
      if( _element.length === 0 ) return;
      _element.each( function(){
        if( $(window).width() < 972 ){
          $(this).find('.hs-block-hei').parent().css('height', 'auto' );
        }else{
          $(this).find('.hs-block-hei').parent().css('height', $(this).find('.hs-img-hei').height() );
        }
      });
      App.fixHei = true;
    },
    initVoteArticle:function(){
      var _rating_bar = $('.hs-rating-bar');
      if( _rating_bar.length === 0 ) return;

      _rating_bar.find('a').on({
          mouseenter: function () {
              $(this).prevAll('a').andSelf().addClass('active');
              $(this).nextAll('a').removeClass('active')
          },
          mouseleave: function () {
              var _voted = _rating_bar.find('.voted');
              if( _voted.length ){
                _voted.prevAll('a').andSelf().addClass('active');
                _voted.nextAll('a').removeClass('active');
              }else{
                _rating_bar.find('a').removeClass('active');
              }
          }
      });

    },
    fixPositionThumbnail: function(){
      if( $('.gallery-thumbs').length ){
        $('.gallery-thumbs').find('.swiper-wrapper').css({'transform':'translate3d(0, 0, 0)','-webkit-transform':'translate3d(0, 0, 0)'});
      }
    },
    isnitializeMaps: function(element, lat, lng) {
      var element = document.getElementById(element);
      if( ! element ) return;
      var styles = [
      {
        stylers: [
          { hue: "#5fcfff" },
          { saturation: 10 },
          { lightness: 20 },
          { gamma: 1.51 }
        ]
      }
    ];
      var mapProp = {
          center: new google.maps.LatLng(lat, lng),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel:false,
          styles: styles
      };

      var map = new google.maps.Map(element, mapProp);

      // var ctString = '<p id="hook">Hello World!</p>';
      // var infowindow = new google.maps.InfoWindow();
      // infowindow.setContent(ctString);
      // infowindow.open(map, marker);

      var infoWindow = null;
      var ctMaps = '<div class="map-marker">';
          ctMaps += '<h3>Happy Seniors Llc.</h3>';
          ctMaps +=  '<p class="p-desc">';
          ctMaps +=   '<img src="images/local.jpg" alt="">';
          ctMaps +=    '<span>12 Brocton Street Johnson City, AZ 332789</span>';
          ctMaps +=  '</p>';
          ctMaps +=  '<p class="p-desc">';
          ctMaps +=    '<img src="images/phone.jpg" alt="">';
          ctMaps +=    '<span>(012) 345-6789</span>';
          ctMaps +=  '</p>';
          ctMaps +=  '<p class="p-desc hours">';
          ctMaps +=   '<img src="images/hours.jpg" alt="">';
          ctMaps +=    '<span>Mon-Sat: 7:00am - 9:00pm Sun: 9:00am - 5:00pm</span>';
          ctMaps +=  '</p>';
          ctMaps +=  '<div class="marker">';
          ctMaps +=    '<img src="images/marker.png" alt="">';
          ctMaps +=  '</div>';
          ctMaps +='</div>';

      infoWindow = new google.maps.InfoWindow();
      var windowLatLng = new google.maps.LatLng(lat,lng);
      infoWindow.setOptions({
          content: ctMaps,
          position: windowLatLng,
          scrollwheel:false,
          stylers: [
            { color: "#5fcfff" }
          ]
      });
      infoWindow.open(map);
    }

  };

  $( document ).ready(function() {
    App.run();
});
  $(window).on('load', function(){
    App.hsFixHeight();
  });

})(jQuery);
