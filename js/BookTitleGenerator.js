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


var nouns = ["brexit", "prophecy", "countryside", "sword", "book", "thief", "puppet", "miniaturist", "girl", "son", "mother", "daughter", "colleague", "politician", "queen", "treasure", "teenage boy", "pencil", "warehouse", "ham shank", "battle", "wizard school", "obelisk", "potion", "carpet", "violet", "rose", "marble", "referendum", "party", "beer", "vodka shot", "cigarette", "motorbike", "spellbook", "life", "death", "romance", "affair", "birds", "crows", "escorts", "game", "artist", "wank"];
var nouns_plural = ["prophecies", "countrysides", "swords", "books", "thieves", "puppets", "miniaturists", "girls", "sons", "mothers", "daughters", "colleagues", "politicians", "queens", "treasures", "teenage boys", "pencils", "warehouses", "ham shanks", "battle", "wizard schools", "obelisks", "potions", "carpets", "flowers", "lilies", "marbles", "elections", "parties", "beers", "vodka shots", "bottles of wine", "cigarettes", "motorbikes", "spellbooks", "lives", "deaths", "romances", "affairs", "members of parliament"];
var nouns_proper = ["brexit", "life", "death", "love", "betrayal", "pain", "suffering", "democracy", "fascism", "art", "vulgarity", "sex", "anger", "frustration", "france", "earth", "meaning", "heaven"];
var adjectives = ["cold", "aggressive", "ugly", "poorly-conceived", "unplanned", "racist", "expensive", "cheap", "slutty", "prudent", "unwise", "tasty", "difficult", "angry", "unpredictable", "second", "first", "regrettable", "magical", "enchanted", "beautiful", "left-wing", "right-wing", "centrist", "politically-expedient", "scientifically-proven", "dubious", "disastrous", "final", "sexually exciting"];
var quests = ["quest", "journey", "trek", "escapade", "road trip", "mission", "suicide mission"];
var verbs_present = ["kill", "brexit", "kiss", "arraign", "march", "serve", "hit", "shake", "walk", "escort", "fight", "sort out", "ruin", "destroy", "repair", "give birth to", "celebrate", "commemorate", "remember", "forget", "drive", "smoke", "regret", "seduce", "frighten", "cuddle", "follow", "wank off", "wank over"];
var verbs_present_er = ["kill", "brexit", "kiss", "arraign", "march", "serv", "hit", "shak", "walk", "escort", "fight", "ruin", "destroy", "repair", "birth", "celebrat", "commemorat", "remember", "forgett", "driv", "smok", "regrett", "seduc", "frighten", "cuddl", "follow", "wank"];
var verbs_present_ing = ["killing", "brexiting", "kissing", "arraigning", "marching", "serving", "hitting", "shaking", "walking", "fighting", "planning", "destroying", "fixing", "giving birth", "partying", "drinking", "remembering", "forgetting", "journeying", "seducing", "painting", "wanking"];
var times = ["nanosecond", "second", "minute", "hour", "day", "days", "week", "fortnight", "year", "years", "decade", "lifetime", "bender", "spree", "rampage", "lunchtime", "breakfast", "midnight snack", "interstellar journey"];
var nationalities = ["Irish", "Romanian", "German", "French", "Scottish", "English", "British", "Welsh", "Polish", "Russian", "Hungarian", "Canadian", "North American", "Australian", "Alien", "Foreign"];
var groups = ["army", "football team", "navy", "game development studio", "team of journalists", "accounts department", "brexit negotiation team", "publishing industry", "construction firm", "trade union", "government", "underground crab army", "WhatsApp group"];
var celebs = ["Margaret Thatcher", "Nigel Farage", "Dwayne 'The Rock' Johnson", "PewdiePie", "Selena Gomez", "Mara Wilson", "The Prime Minister", "Neil Gaiman", "Kim Kardashian", "Daedalus Mole", "Taika Waititi", "Iron Man"];
var forenames = ["Barry", "Keith", "Susan", "Patricia", "Nigel", "Poppy", "Ellen", "Eleanor", "Samia", "Brad", "Joe", "Riz", "Gunther", "Hans"];
var surnames = ["Ahmed", "Trotter", "Harding", "Cornwell", "Smith", "Shaw", "Blount", "Shah", "Rosen", "Choudhury", "Tang", "Glau", "Blitz"];

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
    
    var numberOfFormats = 25;
    var formatSelect = Math.floor(Math.random() * (numberOfFormats));
    
    
    switch(formatSelect) {
    case 0:
        result = "How to " + GetWord(verbs_present) + " a " + GetWord(nouns) + " without Really Trying";
        break;
    case 1:
        result = "The " + GetWord(nouns) + " with all the " + GetWord(nouns_plural);
        break;
    case 2:
        result = "The " + GetWord(adjectives) + " " + GetWord(nouns) + " of the " + GetWord(adjectives) + " " + GetWord(groups);
        break;
    case 3:
        result = "To " + GetWord(verbs_present) + " a " + GetWord(nouns) + ": My " + GetWord(times) + " in the " + GetWord(nationalities) + " " + GetWord(groups);
        break;
    case 4:
        result = "The " + GetWord(quests) + " for the " + GetWord(adjectives) + " " + GetWord(nouns);
        break;
    case 5:
        result = "The " + GetWord(nouns) + " with the " + GetWord(adjectives) + " Tattoo";
        break;
    case 6:
        result = "The " + GetWord(nouns) + " from the Land of " + GetWord(nouns_proper);
        break;
    case 7:
        result = "City of " + GetWord(nouns_plural) + " and " + GetWord(nouns_plural);
        break;
    case 8:
        result = GetWord(verbs_present_ing) + " with " + GetWord(nouns) + "s: the " + GetWord(celebs) + " Story";
        break;
    case 9:
        result = "To " + GetWord(verbs_present) + " a " + GetWord(nouns) + ": the Memoir of " + GetWord(celebs) + ", with a foreword by " + GetWord(celebs);
        break;
    case 10:
        result = GetWord(nouns_plural) + " for " + GetWord(nouns_plural);
        break;
    case 11:
        result = "The " + GetWord(nouns) + " " + GetWord(verbs_present_er) + "er";
        break;
    case 12:
        result = "The " + GetWord(nouns) + " Thief";
        break;
    case 13:
        result = "The " + GetWord(nouns) + " " + GetWord(verbs_present_er) + "er";
        break;
    case 14:
        result = GetWord(forenames) + " " + GetWord(surnames) + " and the " + GetWord(nouns) + "'s " + GetWord(nouns);
        break;
    case 15:
        result = "The " + GetWord(adjectives) + " " + GetWord(nouns) + " of " + GetWord(forenames) + " " + GetWord(surnames);
        break;
    case 16:
        result = "The Secret " + GetWord(nouns) + " of " + GetWord(nouns_plural);
        break;
    case 17:
        result = "The " + GetWord(adjectives) + " " + GetWord(nouns) + " of " + GetWord(nouns_proper);
        break;
    case 18:
        result = "I was a Teenage " + GetWord(nouns);
        break;
    case 19:
        result = "The Curious Incident of the " + GetWord(nouns) + " in the Night-Time";
        break;
    case 20:
        result = GetWord(nouns_proper) + " Trek";
        break;
    case 21:
        result = "The Big Book of " + GetWord(nouns_plural);
        break;
    case 22:
        result = "The " + GetWord(nouns) + " Affair";
        break;
    case 23:
        result = "The " + GetWord(nationalities) + GetWord(nouns_proper) + " Affair";
        break;
    case 24:
        result = "The " + GetWord(nationalities) + GetWord(celebs) + " Affair";
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