var step1 = function(evt){
    var form = document.querySelector('.form');
    var step2Template = document.getElementById('step-2').innerHTML;

    if (evt.target && evt.target.dataset.fn === 'step1complete'){
        evt.preventDefault();
        evt.stopPropagation();

        form.innerHTML = step2Template;
    }        
}

if (document.body.className.indexOf('page') !== -1){
    document.addEventListener('touchstart', step1, false);
    document.addEventListener('click', step1, false);
}
