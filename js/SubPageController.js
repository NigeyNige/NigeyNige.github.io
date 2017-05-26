
var navDisplaying = false;


$(document).ready(function () {
    
    $('#navMobileExpander').bind("click", ToggleNav);
    
});


function ToggleNav() {
    if (!navDisplaying) {
        $('.navMobile').css("display", "block");
    }
    else {
        $('.navMobile').css("display", "none");
    }
    
    navDisplaying = !navDisplaying;
}