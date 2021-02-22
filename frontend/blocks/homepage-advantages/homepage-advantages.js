import "./homepage-advantages.scss";

(() => {
    const carousel = document.querySelector('.js-advantages-carousel');
    if (carousel) {

        if (window.innerWidth < 1200) {

            $(carousel)
                .addClass('owl-carousel')
                .owlCarousel({
                    items: 5,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    mouseDrag: false,
                    nav: true,
                    dots: false,
                    margin: 20,
                    responsive: {
                        0: {
                            items: 1
                        },
                        400: {
                            items: 2
                        },
                        600: {
                            items: 3
                        },
                        900: {
                            items: 4
                        },
                        1200: {
                            items: 5
                        }
                    }
                })

        }

    }

})();
