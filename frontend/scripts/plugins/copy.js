(()=>{
    const copyBtns = document.querySelectorAll('.js-copy');
    if( copyBtns.length ) {
        document.addEventListener('click', (e)=>{
            if( e.target.classList.contains('js-copy') ) {
                e.preventDefault();
                const text = e.target.innerText.replace(' ','');
                copyToClipboard(text);
                return false;
            }
        })
    }
})();

function copyToClipboard(str) {
    const area = document.createElement('textarea');
    document.body.appendChild(area);
    area.value = str;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
}