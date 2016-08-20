var wall = function(evt){
    var form = document.querySelector('.form');
    var formTemplate = document.getElementById('step-1').innerHTML;
    var privacyTemplate = document.getElementById('privacy').innerHTML;

    if (evt.target && evt.target.dataset.fn === 'privacymsg'){
        evt.preventDefault();
        evt.stopPropagation();

        form.innerHTML = privacyTemplate;
    }

    if (evt.target && evt.target.dataset.fn === 'privacyok'){
        evt.preventDefault();
        evt.stopPropagation();

        form.innerHTML = formTemplate;
    }
};

if (document.body.className.indexOf('page') !== -1){
    document.addEventListener('touchstart', wall, false);
    document.addEventListener('click', wall, false);
}