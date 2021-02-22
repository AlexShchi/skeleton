/**
 * Компонент для отслеживание целей
 *
 * @type {{trigger, debug}}
 */
// TODO: Добавь автоматическое подключение нужных счетчиков

var goalsModule = (function(){

    var services = {
        yaCounterID : '',
        mailRuID : false,
        gaUsed : true,
        gtagUsed : true,
        fbqUsed : true
    };

    // PRIVATE =========================================================================================================

    var goalDone = function (goalName, goalCategory) {
        if(services.yaCounterID !=='' &&  typeof window['yaCounter' + services.yaCounterID] !== "undefined"){
            window['yaCounter' + services.yaCounterID].reachGoal(goalName, function () {});
        }
        if(services.mailRuID !=='' && typeof _tmr !== "undefined"){
            _tmr.push({ id: services.mailRuID, type: 'reachGoal', goal: goalName });
        }
        if(services.gaUsed && typeof ga !== "undefined"){
            ga('send', 'event', goalCategory, goalName);
        }
        if(services.gtagUsed && typeof gtag !== "undefined"){
            gtag('event', goalName, {'event_category': goalCategory});
        }
        if(services.fbqUsed && typeof fbq !== "undefined"){
            fbq('track', goalName, { });
        }
    };

    var debug = function () {
        window.onload = function() {
            console.log( 'yaCounterID: ' + (typeof window['yaCounter' + services.yaCounterID] !== "undefined") );
            console.log( 'gaUsed: ' + (typeof ga !== "undefined") );
            console.log( 'fbqUsed: ' + (typeof fbq !== "undefined") );
            console.log( 'mailRuID: ' + (typeof _tmr !== "undefined") );
        }
    };


    // PUBLIC ==========================================================================================================

    return Object.freeze({
        trigger : function(name, params){
            goalDone(name, params);
        },
        debug : function(){ debug(); }
    });
}());
