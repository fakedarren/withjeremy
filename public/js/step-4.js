var step4 = function(evt){
    if (evt.target && evt.target.dataset.fn === 'step4complete'){
        var form = document.querySelector('.form');
        var step5Template = document.getElementById('step-5').innerHTML;

        evt.preventDefault();
        evt.stopPropagation();

        var formdata = new FormData();
        var request = new XMLHttpRequest();

        formdata.append('image', document.querySelector('[name="image"]').value);
        formdata.append('name', document.querySelector('[name="name"]').value);
        formdata.append('job', document.querySelector('[name="job"]').value);
        formdata.append('lives', document.querySelector('[name="lives"]').value);
        formdata.append('age', document.querySelector('[name="age"]').value);
        formdata.append('email', document.querySelector('[name="email"]').value);
        formdata.append('share', !!document.querySelector('[name="share"]:checked').value );

        request.open('POST', '/pledge');
        request.send(formdata);

        form.innerHTML = step5Template;

        window.__TADAAAA__();
    }
};

if (document.body.className.indexOf('page') !== -1){
    document.addEventListener('touchstart', step4, false);
    document.addEventListener('click', step4, false);
}