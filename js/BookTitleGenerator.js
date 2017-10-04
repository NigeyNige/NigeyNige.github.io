$(document).ready(function () {
    
    $('#generateButton').mouseover(function() {
        $(this).css("background-color", "#fff");
        $(this).css("color", "#333");
        
    });
    
    $('#generateButton').mouseout(function() {
        
        $(this).css("background-color", "");
        $(this).css("color", "");
    });
    
    $('#generateButton').click(function() {
        $('#titleField').text(GenerateTitle());
    });
});


var nouns = ["brexit", "prophecy", "countryside", "sword", "book", "thief", "puppet", "miniaturist", "girl", "son", "mother", "daughter"];
var adjectives = ["cold", "aggressive", "ugly", "poorly-conceived", "unplanned", "racist", "expensive", "cheap", "slutty", "prudent", "unwise", "tasty", "difficult", "angry"];
var quests = ["quest", "journey", "attempt", "plan"];
var verbs_present = ["kill", "brexit", "kiss", "arraign", "march", "serve", "hit", "shake", "walk", "escort", "fight", "arrange", "sort out", "ruin", "destroy", "repair", "give birth to", "celebrate", "commemorate", "remember", "forget"];
var times = ["nanosecond", "second", "minute", "hour", "day", "days", "week", "fortnight", "year", "years", "decade", "lifetime", "bender", "spree", "rampage", "lunchtime", "breakfast", "midnight snack"];
var nationalities = ["Irish", "Romanian", "German", "French", "Scottish", "English", "British", "Welsh", "Polish", "Russian", "Hungarian", "Canadian", "North American", "Australian"];
var groups = ["army", "football team", "navy", "game development studio", "journalists team", "accounts department", "brexit negotiation team", "construction firm", "trade union"];

function GenerateTitle()
{
    var result = "";
    
    //Select a format first
    
    /*
    The Girl with the NOUN in her NOUN
    The Girl with the ADJECTIVE NOUN
    QUEST for the NOUN of FANTASYPLACE
    To VERB a NOUN: My TIMEPERIOD in the NATIONAL GROUP
    */
    
    var numberOfFormats = 5;
    var formatSelect = Math.floor(Math.random() * (numberOfFormats - 1));
    
    
    switch(formatSelect) {
    case 0:
        result = "How to " + GetWord(verbs_present) + " a " + GetWord(nouns) + " without Really Trying";
        break;
    case 1:
        result = "The " + GetWord(nouns) + " with all the " + GetWord(nouns) + "s";
        break;
    case 2:
        result = "The " + GetWord(adjectives) + " " + GetWord(nouns) + " of the " + GetWord(nationalities) + " " + GetWord(groups);
        break;
    case 3:
        result = "To " + GetWord(verbs_present) + " a " + GetWord(nouns) + ": My " + GetWord(times) + " in the " + GetWord(nationalities) + " " + GetWord(groups);
        break;
    case 4:
        result = "The " + GetWord(quests) + " for the " + GetWord(adjectives) + " " + GetWord(nouns);
        break;
    case 5:
        result = "The " + GetWord(nouns) + " with the " + Get(adjectives) + " Tattoo";
        break;
    default:
        result = "Gamergate is stupid";
        break;
    }
    
    return result;
}

function GetWord(wordType)
{
    var result = "";
    
    result = wordType[Math.floor(Math.random() * (1 + wordType.length - 1))];
    result = toTitleCase(result);
    
    return result;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}