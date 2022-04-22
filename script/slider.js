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


// // Go to the next item
// $('.customNextBtn').click(function() {
//     $('.owl-carousel').trigger('next.owl.carousel');
// })
// // Go to the previous item
// $('.customPrevBtn').click(function() {
  
//     $('.owl-carousel').trigger('prev.owl.carousel');
// })

