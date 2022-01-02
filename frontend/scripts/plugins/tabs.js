console.log('Ytllo');
(function(){

    var tabs_container = document.querySelectorAll('.js-tabs-line_container');

    if(tabs_container.length){

        var lineTabs = {
            items:[],
            resizeFlag: -1,  // -1 начальное сосотояние для сравнения
            resizeTimeout: null,
            showTabsDefault: {
                texts: ['цвета', 'характеристики'],
            },
            checkDevice: function(){

                if( window.innerWidth > 980 && (!lineTabs.resizeFlag || lineTabs.resizeFlag == -1 ) ){

                    for( var i = 0; i < lineTabs.items.length; i++ ){

                        lineTabs.items[i].container.classList.remove('is_mobile');

                        for( var k = 0; k < lineTabs.items[i].tabs.length; k++ ){
                            lineTabs.items[i].tabs[k].classList.remove('active');
                            lineTabs.items[i].contents[k].classList.remove('active');
                        }
                        lineTabs.items[i].tabs[0].classList.add('active');
                        lineTabs.items[i].contents[0].classList.add('active');
                    }

                    lineTabs.resizeFlag = 1;

                }else if( window.innerWidth <= 980 && ( lineTabs.resizeFlag || lineTabs.resizeFlag == -1 ) ){

                    for( var i = 0; i < lineTabs.items.length; i++ ){

                        lineTabs.items[i].container.classList.add('is_mobile');

                        if( lineTabs.showTabsDefault.texts.length ){
                            for( var k = 0; k < lineTabs.items[i].tabs.length; k++ ){

                                var text = lineTabs.items[i].tabs[k].innerText.toLowerCase();

                                if( lineTabs.showTabsDefault.texts.indexOf(text) > -1 ){

                                    lineTabs.items[i].tabs[k].classList.add('active');
                                    lineTabs.items[i].contents[k].classList.add('active');

                                }else{
                                    lineTabs.items[i].tabs[k].classList.remove('active');
                                    lineTabs.items[i].contents[k].classList.remove('active');
                                }
                            }
                        }else{
                            for( var k = 0; k < lineTabs.items[i].tabs.length; k++ ){
                                lineTabs.items[i].tabs[k].classList.remove('active');
                                lineTabs.items[i].contents[k].classList.remove('active');
                            }
                        }

                    }

                    lineTabs.resizeFlag = 0;

                }
            },
            onResize: function(){

                clearTimeout(lineTabs.resizeTimeout);
                lineTabs.resizeTimeout = setTimeout( lineTabs.checkDevice,500);
            },

        };

        for( var i = 0; i < tabs_container.length; i++ ){


            var item = {
                container: tabs_container[i],
                tabs:      tabs_container[i].querySelectorAll('.js-tab'),
                contents:  tabs_container[i].querySelectorAll('.js-content'),
                tabs_line_resize_flag: 0,
                tabs_line_resize_timeout: null,
            };
            lineTabs.items.push(item);

            for(var j = 0; j< item.tabs.length; j++){
                item.tabs[j].addEventListener('click', function(){

                    var id = this.getAttribute('data-tab-id');
                    var container = this.closest('.js-tabs-line_container');

                    if( container.classList.contains('is_mobile') ){

                        this.classList.toggle('active');

                        var content = container.querySelector('.js-content[data-tab-id="'+id+'"]');

                        if( this.classList.contains('active') ){
                            content.classList.add('active');
                        }else{
                            content.classList.remove('active');
                        }
                    }else{

                        var tabs     = container.querySelectorAll('.js-tab');
                        var contents = container.querySelectorAll('.js-content');

                        for( var i = 0; i < tabs.length; i++ ){

                            tabs[i].classList.remove('active');

                            if( contents[i].getAttribute('data-tab-id') == id){
                                contents[i].classList.add('active');
                            }else{
                                contents[i].classList.remove('active');
                            }

                        }
                        this.classList.add('active');
                    }

                })
            }

        }

        window.addEventListener('DOMContentLoaded', function(){
            lineTabs.checkDevice();
        });
        window.addEventListener('resize', function(){
            lineTabs.onResize();
        });

    }
})();