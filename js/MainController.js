var promoBoxes = $('.promoBox');
var activeBox = 0;


$(document).ready(function () {
    
    for (var i = 0; i < promoBoxes.length; i++) {
        $(promoBoxes[i]).hide();
    }
    
    $(promoBoxes[activeBox]).show();
    
    $('.next').bind("click", CycleNext);
    $('.prev').bind("click", CyclePrev);
    
});

function CycleNext() {
    $(promoBoxes[activeBox]).fadeOut(200);
    
    activeBox++;
    if (activeBox > promoBoxes.length-1) {
        activeBox = 0;
    }
    $(promoBoxes[activeBox]).delay(200).fadeIn(200);
}
function CyclePrev() {
    $(promoBoxes[activeBox]).fadeOut(200);
    activeBox--;
    if (activeBox < 0) {
        activeBox = promoBoxes.length-1;
    }
    $(promoBoxes[activeBox]).delay(200).fadeIn(200);;
}