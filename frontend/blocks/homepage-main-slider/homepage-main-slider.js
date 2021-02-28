import "./homepage-main-slider.scss";
import 'owl.carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';

(() => {
    const mainSlider = document.querySelector('.js-main-slider');
    if (mainSlider) {
        $(mainSlider)
            .addClass('owl-carousel')
            .owlCarousel({
                items: 1,
                autoplay: true,
                autoplayTimeout: 3000,
                animateIn: 'fadeIn',
                animateOut: 'fadeOut',
                loop: true,
                dots: false,
                nav: true,
                mouseDrag: false
            })
    }
})();
