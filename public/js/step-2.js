var step2 = function(evt){
    var form = document.querySelector('.form');
    var step3Template = document.getElementById('step-3').innerHTML;
    var step4Template = document.getElementById('step-4').innerHTML;

    if (evt.target && evt.target.dataset.fn === 'step2skip'){
        evt.preventDefault();
        evt.stopPropagation();

        form.innerHTML = step4Template;
    }
    
    if (evt.files && evt.files.length && evt.dataset.fn === 'step2or3image'){
        var file = evt.files[0];
        var reader = new FileReader();

        form.innerHTML = step3Template;

        var process = function(original, orientation, callback){
            var image = new Image();
            var MAX_WIDTH = 200;

            image.onload = function(){
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var angle = 0;

                switch (orientation){
                    case 3: angle = 180; break;
                    case 6: angle = 90; break;
                    case 8: angle = -90; break;
                }

                if (image.width > MAX_WIDTH) {
                    image.height *= MAX_WIDTH / image.width;
                    image.width = MAX_WIDTH;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = image.width;
                canvas.height = image.height;

                ctx.save();
                ctx.translate(image.width / 2, image.height / 2);
                ctx.rotate(angle * (Math.PI / 180));
                
                ctx.drawImage(image, -(image.width / 2), -(image.height / 2), image.width, image.height);

                callback(canvas.toDataURL());
            };

            image.src = original;
        }

        reader.onload = (function(file){
            return function(evt){
                var base64 = evt.target.result;
                var preview = document.querySelector('[data-fn="step3preview"]'); 
                var previewImage = document.querySelector('[data-fn="step3preview"] .image');

                EXIF.getData(file, function(){
                    process(base64, this.exifdata.Orientation, function(processed){
                        previewImage.style.backgroundImage = 'url(' + processed + ')';
                    });
                });

                
            };
        })(file);

        reader.readAsDataURL(file);
    }
};

if (document.body.className.indexOf('page') !== -1){
    document.addEventListener('touchstart', step2, false);
    document.addEventListener('click', step2, false);   
}