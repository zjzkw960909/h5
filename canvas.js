var canvas = document.getElementById('dice');
var ctx = canvas.getContext('2d');

var img = new Image()
img.onload = function(){
    ctx.drawImage(img, 0, 0);
}
function rotateImage() {
    var rotate = (rate) => {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.save()
        ctx.translate(img.width/2, img.height/2)
        ctx.rotate(rate * Math.PI / 180)
        ctx.drawImage(img, -img.width/2, -img.height/2)
        ctx.restore()
    }
    for(let i = 0;i < 1000; i++) {
        setTimeout(rotate, 300, i)
    }
}
canvas.addEventListener('click', () => {
    rotateImage()
})
img.src='../shaizi.png'

