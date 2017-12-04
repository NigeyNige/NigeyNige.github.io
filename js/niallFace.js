var faceURL = "../images/transparentNige.png";

var timer = 6000;

var nigeImage;

setTimeout(spawnNige, timer);

function spawnNige() {
    
    var img = new Image();
    img.src = faceURL;
    img.style.position = "fixed";
    img.style.left = "0";
    img.style.bottom = "-100";
    
    img.onload = function() {
        document.body.appendChild(img);
        $(img).animate({
            bottom: -40
        }, 2000, function() {
        });
        nigeImage = img;
    
        $(img).wrap($('<a>',{
            href: 'http://unbound.com/books/the-second-death-of-daedalus-mole/',
            target: '_blank'
        }));
        setTimeout(hideNige, 5000);
    };
}

function hideNige() {
    $(nigeImage).animate({
        bottom: -500
    }, 2000, function() {
    });
}