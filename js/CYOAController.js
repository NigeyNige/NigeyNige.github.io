var buttonA;
var buttonB;
var gameText;

$(document).ready(function () {
    buttonA = $('#game_ButtonA');
    buttonB = $('#game_ButtonB');
    gameText = $('#game_Text');
    buttonA.bind("click", PressButtonA);
    buttonB.bind("click", PressButtonB);
    ReadyButtons();
});

function PressButtonA() {
    gameText.text("Glad you like it."); //add fade
    RefreshButtons();
}

function PressButtonB() {
    gameText.text("Well, piss off, then."); //add fade
    RefreshButtons();
}

/* Make the buttons pop in once the text has scrolled. */
function ReadyButtons() {
    buttonA.css('visibility','hidden');
    buttonB.css('visibility','hidden');
    
    buttonA
        .delay(1400 + 400)
        .queue(function (next) { 
            $(this).css('visibility','visible'); 
            next();
    });
        
    buttonB
        .delay(1400 + 900)
        .queue(function (next) { 
            $(this).css('visibility','visible'); 
            next();
    });
}

function RefreshButtons(chapterID) {
    buttonA.css('visibility','hidden');
    buttonB.css('visibility','hidden');
    
    //fadeout old buttons and fadein the new buttons
    
    var optionA = "defaultA";
    var optionB = "defaultB";
    
    switch (chapterID) {
        case "AA": optionA = "Fight";   optionB = "Run";    break;
        case "AB": optionA = "Scream";  optionB = "Honk";   break;
        case "BA": optionA = "Cry";     optionB = "Fist";   break;
        case "BB": optionA = "Sleep";   optionB = "Bonk";   break;
    }
    
    buttonA.text(optionA);
    buttonB.text(optionB);
    
    buttonA
        .delay(400)
        .queue(function (next) { 
            $(this).css('visibility','visible'); 
            next();
    });
        
    buttonB
        .delay(900)
        .queue(function (next) { 
            $(this).css('visibility','visible'); 
            next();
    });
}