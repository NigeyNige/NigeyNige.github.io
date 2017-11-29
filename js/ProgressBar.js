$(document).ready(function () {
    
    
    var progress = 0;
    var supporters = 0;
    
    var percentageTitle = $('#JS_ProgressTitle');
    var percentageBar = $('#JS_ProgressBar');
    var supporterCount = $('#JS_Supporters');
    
    
    var attempt = $.getJSON(
        'https://unbound.com/books/the-second-death-of-daedalus-mole/supporters.hta', 
        function(data){
            $('#dataHolder').html($(data.contents).find("strong").text().substr(33));
            var result = $('#dataHolder').text();
            progress = parseInt(result.substr(0,2));
            supporters = parseInt(result.substr(3));
            percentageTitle.text(progress + "%");
            percentageBar.width(progress + "%");
            supporterCount.text(supporters + " backers");
        });
    
    
    setTimeout(function() {
        attempt.abort();
        console.log("Couldn't grab live numbers from Unbound.");
        percentageTitle.text("87%");
        percentageBar.width("87%");
        supporterCount.text("157 backers");
    }, 2000);
    
});

/*
    This script looks for the unbound progress bar on the supporters page, using the fact that
    it's the only element using the CSS class: gap--xs padding--vertical-sm text--center text--dark-grey
    
    It grabs the progress percentage and supporter count using that. It's a bit hacky and may break
    if Unbound make any changes to that page.
*/