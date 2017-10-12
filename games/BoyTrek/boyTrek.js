var canvas = document.getElementById("Canvas_BoyTrek");
var ctx = canvas.getContext("2d");

var Height = canvas.height;
var Width = canvas.width;

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


//Panel Image
var panelReady = false;
var panelImage = new Image();
panelImage.onload = function ()
{
	panelReady = true;
};
panelImage.src = "BoyTrek/img_panel.png";


// Game objects
var road = {
    speed: 64, // movement in pixels per second
    x: 0,
    y: 100
};
var boy = {
    x: 4,
    y: road.y -22
};

var panel = {
    text1: "STORY TEXT GOES HERE. THANK YOU.",
    text2: "STORY TEXT GOES HERE. THANK YOU.",
    text3: "STORY TEXT GOES HERE. THANK YOU.",
    x: 3,
    y: 128
}

var distanceTravelled = 0;
var strength = 50;
var walking = true;
var walkSpeed = 0.02;
var walkSpeedMultiplier = 64 * 50;

var reset = function () {
    
};


//Update function
var update = function (modifier) {
    
    road.speed = walkSpeed * walkSpeedMultiplier;
    
	if (walking) {
		road.x -= road.speed * modifier;
		if (road.x < - Width) {
			road.x = 0;
		}
    
    	distanceTravelled += walkSpeed;
	}
    
};

// Draw everything
var render = function () {
	
	ctx.clearRect(0,0, canvas.width,canvas.height);
	
	if (roadReady) {
		ctx.drawImage(roadImage, road.x, road.y);
		ctx.drawImage(roadImage, road.x + 64*4, road.y);
	}

	if (boyReady) {
		ctx.drawImage(boyImage, boy.x, boy.y);
	}
	renderUI();

};

function renderUI() {
	
    // Score
	
    ctx.fillStyle = "#000";
    ctx.font = "8px pixeled";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(Math.round(distanceTravelled) + "M FROM HOME", 2, 4);
    ctx.fillText("STRENGTH: " + strength, 2, 24);
    
	if (panelReady) {
		ctx.drawImage(panelImage, panel.x, panel.y);
        ctx.fillText(panel.text1, panel.x + 6, panel.y);
        ctx.fillText(panel.text2, panel.x + 6, panel.y + 16);
        ctx.fillText(panel.text3, panel.x + 6, panel.y + 32);
	}
}

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

function Eat() {
    
}

function Rest() {
    
    //Stop walking
    if (walking) {
        document.getElementById("btn_Rest").textContent = "Walk";
    }
    //Start walking
    else {
        document.getElementById("btn_Rest").textContent = "Rest";
    }
    
    walking = !walking;
}

function Write() {
    
}

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();