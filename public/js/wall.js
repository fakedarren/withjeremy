var wall = function(evt){
    var form = document.querySelector('.form');
    var formTemplate = document.getElementById('step-1').innerHTML;
    var wallTemplate = document.getElementById('wall').innerHTML;

    if (evt.target && evt.target.dataset.fn === 'wallmsg'){
        evt.preventDefault();
        evt.stopPropagation();

        form.innerHTML = wallTemplate;
    }

    if (evt.target && evt.target.dataset.fn === 'showwall'){
        evt.preventDefault();
        evt.stopPropagation();

        window.location = '/wall';
    }

    if (evt.target && evt.target.dataset.fn === 'cancelwall'){
        evt.preventDefault();
        evt.stopPropagation();

        form.innerHTML = formTemplate;
    }
};

if (document.body.className.indexOf('page') !== -1){
    document.addEventListener('touchstart', wall, false);
    document.addEventListener('click', wall, false);
}