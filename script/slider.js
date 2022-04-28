function OC(){
    $(document).ready(function(){
        $(".owl-carousel").owlCarousel({
        nav:true,
        loop:true,
        margin:10,
        autoplay:true,
        center : true,
        mouseDrag : false,
        navText: ["<i class='bi bi-caret-left-fill'></i>","<i class='bi bi-caret-right-fill'></i>"],
        padding: 0,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:3
            }
        }
      });
    });
}




// // Go to the next item
// $('.customNextBtn').click(function() {
//     $('.owl-carousel').trigger('next.owl.carousel');
// })
// // Go to the previous item
// $('.customPrevBtn').click(function() {
  
//     $('.owl-carousel').trigger('prev.owl.carousel');
// })


function splide(){
      var main = new Splide( '#main-slider', {
        type       : 'fade',
        heightRatio: 0.5,
        pagination : false,
        arrows     : true,
        cover      : true,
        classes: {
          arrows: 'splide__arrows arrows',
          arrow : 'splide__arrow arrows',
          prev  : 'splide__arrow--prev owl-prev ',
          next  : 'splide__arrow--next owl-next',
        },
      } );
      
      var thumbnails = new Splide( '#thumbnail-slider', {
        padding: { top: 10, bottom: 10 },
        rewind          : false,
        fixedWidth      : 200,
        fixedHeight     : 120,
        isNavigation    : true,
        gap             : 10,
        focus           : 'center',
        arrows     : false,
        type   : 'loop',
        pagination      : false,
        cover           : true,
        dragMinThreshold: {
          mouse: 4,
          touch: 10,
        },
        breakpoints : {
          640: {
            fixedWidth  : 66,
            fixedHeight : 38,
          },
        },
      } );
      
      
     

      main.sync( thumbnails );
      main.mount();
      thumbnails.mount();
}
