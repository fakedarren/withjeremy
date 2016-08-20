var animator = function(){
    var rotate = 15 - Math.floor(Math.random() * 30),
        scale = (100 - (30 - Math.floor(Math.random() * 50))) / 100,
        x = 10 - Math.floor(Math.random() * 20),
        y = 20 - Math.floor(Math.random() * 10);

    var bg = document.querySelector('.background');

    if (bg){
        bg.style.transform = 'rotate(' + rotate + 'deg) scale(' + scale + ') translateX(-' + x + '%) translateY(-' + y + '%) '
    }
};

if (document.body.className.indexOf('page') !== -1){
    window.setInterval(animator, 10000);
    animator();
}