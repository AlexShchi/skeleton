/**
 * Компонент для отслеживание целей
 *
 * @type {{trigger, debug}}
 */


const goalsModule = (() => {

    var services = {
        yaCounterID: [],
        mailRuID: false,
        gaUsed: true,
        gtagUsed: true,
        fbqUsed: true
    };

    window.addEventListener('load', ()=>{
        if( typeof Ya !== 'undefined' ){

            for( let item in Ya._metrika.counters){
                if(item){
                    services.yaCounterID.push(item.split(':')[0]);
                }
            }

        }
    })


    // PRIVATE =========================================================================================================

    var goalDone = function (goalName, goalCategory) {

        if (services.yaCounterID.length) {

            services.yaCounterID.forEach( (item) => {

                console.log(window[`yaCounter${item}`]);
                if (typeof window[`yaCounter${item}`] !== "undefined") {
                    window[`yaCounter${item}`].reachGoal(goalName, function () {
                    });
                }

            })
        }

        if (services.mailRuID !== '' && typeof _tmr !== "undefined") {
            _tmr.push({id: services.mailRuID, type: 'reachGoal', goal: goalName});
        }
        if (services.gaUsed && typeof ga !== "undefined") {
            ga('send', 'event', goalCategory, goalName);
        }
        if (services.gtagUsed && typeof gtag !== "undefined") {
            gtag('event', goalName, {'event_category': goalCategory});
        }
        if (services.fbqUsed && typeof fbq !== "undefined") {
            fbq('track', goalName, {});
        }
    };


    // ADD goals

    const defaultsClicks = {
        'Phone'        : 'tel:',
        'Mail'         : 'mailto:',
        'WhatsApp'     : 'api.whatsapp.com',
        'Telegram'     : 'telegram.me',
        'Facebook'     : 'facebook.com',
        'Vkontakte'    : 'vc.com',
        'Instagram'    : 'instagram.com',
        'Odnoklassniki': 'ok.ru',
        'Twitter'      : 'twitter.com',
        'Youtube'      : 'youtube.com',
        'Zen'          : 'zen.yandex.ru',

    }

    const defaultsShare = {
        'OkShare'      : 'connect.ok.ru/offer',
        'VKShare'      : 'vk.com/share.php',
        'FbShare'      : 'facebook.com/sharer',
    }

    document.addEventListener('click', (event) => {

        let target = event.target;

        if (target.tagName !== 'a') {

            target = target.closest('a');
            if (target == null) return;

        }

        if( target.closest('.share') ){
            for (let key in defaultsShare) {

                if (target.href.indexOf(defaultsShare[key]) > -1) {
                    goalDone(`Click on ${key}`, 'Clicks');
                    break;
                }

            }
        } else {
            for (let key in defaultsClicks) {

                if (target.href.indexOf(defaultsClicks[key]) > -1) {
                    goalDone(`Click on ${key}`, 'Clicks');
                    break;
                }

            }
        }

    })

    var debug = function () {
        window.onload = function () {
            console.log('yaCounterID: ' + (typeof window['yaCounter' + services.yaCounterID] !== "undefined"));
            console.log('gaUsed: ' + (typeof ga !== "undefined"));
            console.log('fbqUsed: ' + (typeof fbq !== "undefined"));
            console.log('mailRuID: ' + (typeof _tmr !== "undefined"));
        }
    };


    // PUBLIC ==========================================================================================================

    return Object.freeze({
        trigger: function (name, params) {
            goalDone(name, params);
        },
        debug: function () {
            debug();
        }
    });
})();

export default goalsModule;
