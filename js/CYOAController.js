var buttonA;
var buttonB;
var gameText;

$(document).ready(function () {
    buttonA = $('#game_ButtonA');
    buttonB = $('#game_ButtonB');
    gameText = $('#game_Text');
    buttonA.bind("click", PressButtonA);
    buttonB.bind("click", PressButtonB);
    
});

function PressButtonA() {
    gameText.text("Glad you like it."); //add fade
    RefreshButtons();
}

function PressButtonB() {
    gameText.text("Well, piss off, then."); //add fade
    RefreshButtons();
}

function RefreshButtons() {
    buttonA.hide();
    buttonB.hide();
    
    //fadeout old buttons and fadein the new buttons
}