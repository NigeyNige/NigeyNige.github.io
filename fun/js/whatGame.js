var gamesLoaded = false;

var gameResult;

//Grab the existing elements
var gameTitle = document.getElementById("gameTitle");
var gameImage = document.getElementById("gameImage");
var gameDescription = document.getElementById("gameDescription");
var gameLink = document.getElementById("gameLink");

var notification = document.getElementById("notification");

var selectedGame;

var listLoaded = false;
var loadedGames = [];

var nextImageLoaded = false;

var rssFeedURL = "https://itch.io/games/newest.xml";

generateList(30);

var selector = 0;

function generateList(size) {
    
    var numberOfItemsToGrab = size;
    
    $.get(rssFeedURL, function (data) {
        if (loadedGames.length < size) {
            $(data).find("item").each(function () {
                loadedGames.push($(this));
                console.log("Pushed an item.");
            });
            listLoaded = true;
            if (gameTitle.innerHTML == "Hunting for games...") {
                gameTitle.innerHTML = "Ready!";
            }
            loadedGames = shuffle(loadedGames);
        }
    });
}

function getNewGame() {
    
    if (!listLoaded) {
        gameTitle.innerHTML = "Hunting for games...";
        return;
    }
    
    //Get the details of a game from the list
    selectedGame = loadedGames[selector];
    
    //Use JQuery's built-in XML support to parse the feed
    
    try {
        newTitle = selectedGame.find("plainTitle").text();
        imageSRC = selectedGame.find("imageurl").text();
        newDescription = selectedGame.find("description").text();
        newLink = selectedGame.find("link").text();
    } catch(err) {
        //There's a chance itch might not respond, in which case the above function calls will fail.
        showNotification("Itch.io is not responding. Please try again later.", 3000);
        console.log(err.message);
        return;
    }

    //Itch puts an IMG tag in the 'description' block but we only want the first bit of text.
    //So drop everything after the '<' character.
    newDescription = newDescription.substring(0, newDescription.indexOf('<'));

    //Swap out the existing content for the random game's content

    gameTitle.innerHTML = newTitle;
    
    //Display the loading gif while the new image is loaded
    hideImage();
    
    //Sneaky! It doesn't take this long to load but swapping the gif and delaying -feels- faster than displaying nothing for a shorter time
    var delay = 800;
    
    setTimeout(displayImage, delay);
    setTimeout(gameImage.setAttribute("src", imageSRC), delay);
    
    gameDescription.innerHTML = newDescription;
    gameLink.setAttribute("href", newLink);
    
    if (selector < loadedGames.length-1)
        selector++;
    else
        selector = 0;
}

function shuffle(array) {
    
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }  

    return array;
}

function newList(url) {
    
    //User chose a new feed to draw from. Refresh the list from the new RSS feed.
    
    rssFeedURL = url;
    loadedGames = [];
    generateList(30);
    
    showNotification("New list selected.", 1000);
}

function hideImage() {
    gameImage.style.visibility = "hidden";
}

function displayImage() {
    gameImage.style.visibility = "visible";
}

function showNotification(text, duration) {
    notification.innerHTML = text;
    setTimeout(hideNotification, duration);
}

function hideNotification() {
    notification.innerHTML = "";
}