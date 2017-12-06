var faceURL = "../images/transparentNige.png";

var timer = 5000;

var nigeImage;

setTimeout(spawnNige, timer);

function spawnNige() {
    
    var img = new Image();
    img.src = faceURL;
    img.style.position = "fixed";
    img.style.left = "-20px";
    img.style.bottom = "-200px";
    
    img.onload = function() {
        document.body.appendChild(img);
        $(img).animate({
            bottom: "-20px"
        }, 400, function() {
        });
        nigeImage = img;
    
        $(img).wrap($('<a>',{
            href: 'http://unbound.com/books/the-second-death-of-daedalus-mole/',
            target: '_blank'
        }));
        setTimeout(hideNige, 4000);
    };
}

function hideNige() {
    $(nigeImage).animate({
        bottom: "-200px"
    }, 800, function() {
    });
}