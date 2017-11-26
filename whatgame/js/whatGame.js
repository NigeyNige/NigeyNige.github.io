var gamesLoaded = false;

var gameResult;

var gameTitle;
var gameImage;
var gameDescription;
var gameLink;

var newTitle;
var imageSRC;
var newDescription;
var newLink;

var selectedGame;

function getNewGame() {
    
    //Grab the existing elements
    
    gameResult = document.getElementById("gameResult");
    
    gameTitle = document.getElementById("gameTitle");
    gameImage = document.getElementById("gameImage");
    gameDescription = document.getElementById("gameDescription");
    gameLink = document.getElementById("gameLink");
    
    //Get the details of a random game from the internet
    
    newTitle = "newTitle";
    imageSRC = "";
    newDescription = "newDescription";
    newLink = "/";
    
    getFeed();
    
    gameImage.setAttribute("src", "images/loading.gif");
    gameTitle.innerHTML = "Thinking...";
    gameDescription.innerHTML = "";
    gameLink.setAttribute("href", "");
}

function getFeed() {
    
    //itch.io provides RSS feeds where each game is referred to as an 'item'.
    //We can get different kinds of results by using other URLs provided by Itch.
    //The code below will only work with Itch - other stores will need custom code.
    
    var numberOfItemsToGrab = 10;
    
    var rssFeedURL = "https://itch.io/games/newest.xml";
    
    var selector = Math.floor(Math.random() * numberOfItemsToGrab);
    
    $.get(rssFeedURL, function (data) {
        $(data).find("item").eq(selector).each(function () {
            selectedGame = $(this);
            parseFeed();
        });
    });
    
}

function parseFeed() {
        
    console.log("Selected game is " + selectedGame);

    //Use JQuery's built-in XML support to parse the feed

    newTitle = selectedGame.find("plainTitle").text();
    imageSRC = selectedGame.find("imageurl").text();
    newDescription = selectedGame.find("description").text();
    newLink = selectedGame.find("link").text();

    //Itch puts an IMG tag in the 'description' block but we only want the first bit of text.
    //So drop everything after the '<' character.
    newDescription = newDescription.substring(0, newDescription.indexOf('<'));

    //Swap out the existing content for the random game's content

    gameTitle.innerHTML = newTitle;
    gameImage.setAttribute("src", imageSRC);
    gameDescription.innerHTML = newDescription;
    gameLink.setAttribute("href", newLink);

    //Do a fancy animation

    //itemToAdd.style.height = "1px";
    //animate in the width as a wipe type thing
    //setTimeout(function() { itemToAdd.style.height = "50px";}, 1)

    //.focus() on re-roll button for rapid tapping
}