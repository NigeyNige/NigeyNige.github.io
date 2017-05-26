var promoBoxes = $('.promoBox');
var activeBox = 0;

var navDisplaying = false;


$(document).ready(function () {
    
    for (var i = 0; i < promoBoxes.length; i++) {
        $(promoBoxes[i]).hide();
    }
    
    $(promoBoxes[activeBox]).show();
    
    $('.navMobile').hide();
    $('.next').bind("click", CycleNext);
    $('.prev').bind("click", CyclePrev);
    
    $('#navMobileExpander').bind("click", ToggleNav);
    //$("#newPostButton").bind("click", NewPost);
    
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

function ToggleNav() {
    if (!navDisplaying) {
        $('.navMobile').css("display", "block");
    }
    else {
        $('.navMobile').css("display", "none");
    }
    
    navDisplaying = !navDisplaying;
}

function NewPost() {
    $("#newsContainer").append("<div class='newsItem'> <h2>Mailing list</h2><p><em>Thursday 25 May 2017</em></p><p>If you like space opera about emotionally stunted men and the women who hate them, or adventures in amateur game development, sign up to my new mailing list below.</p><p>Youll get an occasional email in your inbox with dev blogs, exclusive short stories or offers, discount codes and things. I do this for a living so I wont send you anything annoying, promise.</p></div><br />");
}