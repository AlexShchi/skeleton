import "./homepage-reviews.scss";

(()=>{
    const carousel = document.querySelector('.js-reviews-carousel');
    if(carousel){
        $(carousel)
            .addClass('owl-carousel')
            .owlCarousel({
                items:2,
                loop:true,
                autoplay: true,
                autoplayTimeout: 8000,
                autoplayHoverPause: true,
                mouseDrag: false,
                nav:true,
                dots: false,
                margin: 20,
                responsive: {
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    }
                }
            })
    }
})();
