var jokeHolder = document.getElementById("jokeHolder");

var apiKey = "bfbcfiiicgfzbwfihfchxaacivhzypd";

var maxLength = "1400";

var requestURL = "http://webknox.com/api/jokes/random?maxLength=" + maxLength + "&apiKey=" + apiKey;

function getJoke() {
    var result = "";
    
    /*
    $.get('http://www.whateverorigin.org/get?url=' + encodeURIComponent(requestURL) + '&callback=?', result, function() {
        console.log("Got joke " + result);
        jokeHolder.innerHTML = result;
    });
    */
    
    $.getJSON("http://webknox.com/api/jokes/random?maxLength=140&apiKey=bfbcfiiicgfzbwfihfchxaacivhzypd", result, function() {
        console.log(result);
    });
    
}