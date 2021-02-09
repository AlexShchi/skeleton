function mapInit(options){
    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map(options.id, {
            center: options.center,
            zoom: options.zoom,
            controls: ['routeButtonControl'],
        });
        myMap.behaviors.disable('scrollZoom');
        var myPlacemark = new ymaps.Placemark(options.placemark, {
            hintContent: options.hint,
            balloonContent: options.baloon
        });
        myMap.geoObjects.add(myPlacemark);
        myMap.controls.add('zoomControl', {
            size: 'small',
            float: 'none',
            position: {
                top:   '220px',
                right: '30px'
            }
        });

        // routePanelControl = new ymaps.control.RoutePanel({
        //     options: {
        //         showHeader: false, //Показывать заголовок навигационной панели
        //         title: 'Проложить маршрут', //Заголовок панели
        //         allowSwitch: false, //Отображать кнопку для смены местами Откуда/Куда
        //         maxWidth: '300px', //Ширина панели (макс. 400px)
        //         float: 'left', // Расположение в левой части карты
        //         visible: true,
        //     },
        //     state: {
        //         fromEnabled: false,
        //         from: [56.113363, 40.331073],
        //         to: [56.129847, 40.393280],
        //         types: {
        //             auto: true,
        //             taxi:true
        //         }
        //     }
        // });

        // myMap.controls.add(routePanelControl);

        // let сontrol = myMap.controls.get('routeButtonControl');
        // control.routePanel.state.set('from', 'чернышевская');

    }
}




const maps = document.querySelectorAll('.js-map');
if ( maps.length ) {

    document.addEventListener('mousemove', handle);
    document.addEventListener('touchstart', handle);
    // document.addEventListener('scroll', handle);

    function setIds(){
        maps.forEach((map)=>{
            map.setAttribute( 'id', idGenerator() );
        })
    }

    function idGenerator(){
        return Math.floor(Math.random() * 1000000);
    }

    function handle() {

        document.removeEventListener('mousemove', handle);
        document.removeEventListener('touchstart', handle);
        // document.removeEventListener('scroll', handle);

        // const options = {
        //     id: map.getAttribute('id'),
        //     center: [56.130193, 40.391335],
        //     placemark: [56.130175, 40.394001],
        //     zoom: 16,
        //     baloon: 'Никонов Максим Андреевич. Адрес: 600025, г. Владимир, ул. Малые Ременники, 11 «а», оф. 1',
        //     hint: 'Адвокат находится здесь'
        // };

        setIds();

        var script = document.createElement('script');
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
        script.onload = function () {

            maps.forEach((map)=>{

                try{

                    const center    = map.getAttribute('data-center').split(',');
                    const placemark = map.getAttribute('data-placemark').split(',');

                    const options = {
                        id:        map.getAttribute('id'),
                        center:    [parseFloat(center[0]),parseFloat(center[1])],
                        placemark: [parseFloat(placemark[0]),parseFloat(placemark[1])],
                        zoom:      map.getAttribute('data-zoom')|16,
                        baloon:    map.getAttribute('data-baloon'),
                        hint:      map.getAttribute('data-hint')
                    };

                    mapInit(options);

                }catch(err){

                    console.warn('Не хватает данных для инициализации карты с id=' + map.getAttribute('id'));

                }

            })

        }


        document.getElementsByTagName('body')[0].appendChild(script);

    }
}