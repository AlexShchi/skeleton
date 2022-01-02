
/********** scroller **************/

( ()=> {
    if( document.querySelector('.js-scroll-to') ) {
        document.addEventListener('click', function(e) {
            let dataScrollTo = e.target.getAttribute('data-scroll-to');
            // console.log('click');
            if( dataScrollTo ) {
                // console.log( dataScrollTo );
                e.preventDefault();

                // let target = document.querySelector('[name="'+dataScrollTo.replace('#','')+'"]');
                let target = document.querySelector(dataScrollTo);

                console.log(target);

                // console.log(getCoords(target));

                if( target ) {
                    scrollTo2( target );
                }


                return false;
            }

        } );
    }
} )();

const scrollTo2 = ( element )=> {
    if( element ) {

        let windowHeight = window.innerHeight,
            documentHeight = document.body.clientHeight;


        // console.log('windowHeight: ' + windowHeight);
        // console.log('documentHeight: ' + documentHeight);

        if( typeof( element ) === 'string' ) {
            switch ( element ) {
                case 'top':
                    scrollTo( 0 );
                    break;
                case 'bottom':
                    scrollTo( documentHeight - windowHeight );
                    break;
            }
        } else {
            let offsetTop = Math.min(Math.floor(getCoords( element ).top), documentHeight - windowHeight  );
            // console.log('offsetTop: ' + offsetTop);
            scrollTo( offsetTop );
        }

    } else {
        console.log('Параметр функции не соотвествует ожидаемому!');
    }
};

const scrollTo = ( offsetTop, speed, way ) => {

    if(!speed){
        speed = 50000;
    }
    if(!window.scrollToStart){
        window.scrollToStart = Date.now();
    }

    if( !way ){
        way = (window.pageYOffset || document.documentElement.scrollTop) > offsetTop ? 'top' : 'bottom';
    }

    // console.log('way: ' + way);

    let progress = Date.now() - window.scrollToStart;

    if( way == 'bottom') {
        // крутим вниз
        // console.log('/*******************/');
        // console.log('scrollTop: ' + (window.pageYOffset || document.documentElement.scrollTop) );
        // console.log('offsetTop: ' + offsetTop );
        if( (window.pageYOffset || document.documentElement.scrollTop) < offsetTop){
            window.scrollBy(0, Math.min(progress / 10, speed));
            window.cancelAnimationFrame(window.requesedID);
            window.requesedID = window.requestAnimationFrame( ()=> { scrollTo( offsetTop, speed, way) } );
            // console.log(window.requesedID);
        } else {
            window.cancelAnimationFrame(window.requesedID);
            window.scrollToStart = 0;
            window.requesedID = 0;
        }
        // console.log('to bottom');
    } else {
        // крутим вверх
        if( (window.pageYOffset || document.documentElement.scrollTop) > offsetTop){
            window.scrollBy(0, -( Math.min(progress / 10, speed)) );
            window.cancelAnimationFrame(window.requesedID);
            window.requesedID = window.requestAnimationFrame( ()=> { scrollTo( offsetTop, speed, way) } );
            // console.log(window.requesedID);
        } else {
            window.cancelAnimationFrame(window.requesedID);
            window.scrollToStart = 0;
            window.requesedID = 0;
        }
        // console.log('to top');
    }

};


// const scrollTo = (scrollHeight, speed) => {
//
//     if(!scrollHeight){
//         let body = document.body,
//             html = document.documentElement;
//             scrollHeight = Math.max( body.scrollHeight, body.offsetHeight,
//             html.clientHeight, html.scrollHeight, html.offsetHeight ) - window.clientHeight;
//     }
//     if(!speed){
//         speed = 200;
//     }
//     if(!window.scrollToStart){
//         window.scrollToStart = Date.now();
//     }
//     let progress = Date.now() - window.scrollToStart;
//
//     if( (window.pageYOffset || document.documentElement.scrollTop) < scrollHeight){
//         window.scrollBy(0, Math.min(progress / 10, speed));
//         window.cancelAnimationFrame(window.requesedID);
//         window.requesedID = window.requestAnimationFrame( ()=> { scrollTo(scrollHeight, speed) } );
//         console.log(window.requesedID);
//     } else {
//         window.cancelAnimationFrame(window.requesedID);
//         window.scrollToStart = 0;
//         window.requesedID = 0;
//     }
//
//
// };

let toTop = document.querySelector('.js-to-top');
if( toTop ) {
    document.addEventListener('click', (e)=> {
        // console.log(e.target.classList.contains);
        if( e.target.classList.contains('js-to-top') ) {
            e.preventDefault();
            scrollTo2('top');
            return false;
        }
    });
}
