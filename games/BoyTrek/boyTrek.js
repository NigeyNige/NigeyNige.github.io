var canvas = document.getElementById("Canvas_BoyTrek");
var ctx = canvas.getContext("2d");

var Height = 64;
var Width = 64;

//Road Image
var roadReady = false;
var roadImage = new Image();
roadImage.onload = function ()
{
	roadReady = true;
};
roadImage.src = "BoyTrek/img_road.png";


//Boy Image
var boyReady = false;
var boyImage = new Image();
boyImage.onload = function ()
{
	boyReady = true;
};
boyImage.src = "BoyTrek/img_boy.png";



// Game objects
var road = {
    speed: 64, // movement in pixels per second
    x: 0,
    y: Height -8
};
var boy = {
    x: 4,
    y: Height -32
};
var distanceTravelled = 0;

// Reset the game when the player catches a monster
var reset = function () {
    
};


//Update function
var update = function (modifier) {
    road.x -= road.speed * modifier;
    if (road.x < - Width)
        road.x = 0;
    
    distanceTravelled += 1;
};

// Draw everything
var render = function () {
	if (roadReady) {
		ctx.drawImage(roadImage, road.x, road.y);
		ctx.drawImage(roadImage, road.x + 64, road.y);
	}

	if (boyReady) {
		ctx.drawImage(boyImage, boy.x, boy.y);
	}
    

    // Score
    ctx.fillStyle = "#000";
    ctx.font = "12px Helvetica";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText("Distance travelled: " + distanceTravelled, 250, 4);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();