var step3 = function(evt){
    var form = document.querySelector('.form');
    var step4Template = document.getElementById('step-4').innerHTML;

    if (evt.target && evt.target.dataset.fn === 'step3complete'){
        evt.preventDefault();
        evt.stopPropagation();

        var previewImage = document.querySelector('[data-fn="step3preview"] .image');
        var processedImage = previewImage.style.backgroundImage;

        form.innerHTML = step4Template;

        document.querySelector('[name="image"]').value = processedImage;
    }

    if (evt.target && evt.target.dataset.fn === 'step3skip'){
        evt.preventDefault();
        evt.stopPropagation();

        form.innerHTML = step4Template;
    }
};

if (document.body.className.indexOf('page') !== -1){
    document.addEventListener('touchstart', step3, false);
    document.addEventListener('click', step3, false);
}