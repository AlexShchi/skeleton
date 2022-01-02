import "./coockis_agreement.scss";

(function(){
    console.log(localStorage.cookieMessage);
    if(!localStorage.cookieMessage){
        document.addEventListener('DOMContentLoaded', function(){
            var cookies = document.getElementById('cookies');
            if(cookies){

                setTimeout(function(){
                    cookies.classList.add('active');
                },3000);

                document.body.addEventListener('click', cookie);
            }

            function cookie(e) {
                if (e.target.classList.contains('js-cookie-close')) {
                    cookies.classList.remove('active');
                    localStorage.cookieMessage = 'read';
                    document.body.removeEventListener('click', cookie);
                }
            }

        });
    }

})();
