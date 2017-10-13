var canvas = document.getElementById("Canvas_Catcher");
var ctx = canvas.getContext("2d");

var canvasScale = 2; //magic number

//Rock Image
var rockReady = false;
var rockImage = new Image();
rockImage.onload = function ()
{
	rockReady = true;
};
rockImage.src = "Catcher/img_rock.png";


//Ship Image
var shipReady = false;
var shipImage = new Image();
shipImage.onload = function ()
{
	shipReady = true;
};
shipImage.src = "Catcher/img_ship.png";


//Boy Image
var boyReady = false;
var boyImage = new Image();
boyImage.onload = function ()
{
	boyReady = true;
};
boyImage.src = "Catcher/img_boy.png";

//Stars Images
var stars_brightReady = false;
var stars_brightImage = new Image();
stars_brightImage.onload = function ()
{
	stars_brightReady = true;
};
stars_brightImage.src = "Catcher/img_stars_bright.png";
var stars_dimReady = false;
var stars_dimImage = new Image();
stars_dimImage.onload = function ()
{
	stars_dimReady = true;
};
stars_dimImage.src = "Catcher/img_stars_dim.png";


// GAME OBJECTS

var ship = {
    rescues: 0,
	losses: 0,
    width: shipImage.width,
    height: shipImage.height,
    x: 5,
    y: (canvas.height/2) - (shipImage.height/2),
    speed: 64
};

var stars = {
    dimx: 0,
    brightx: 0,
	dimSpeed: 32,
	brightSpeed: 2
};

var difficulty = 1;

var num_Asteroids = 10;
var asteroids = [num_Asteroids];
var asteroid_Interval = 50;

function Asteroid()
{
    this.width = rockImage.width;
    this.height = rockImage.height;
    this.x = canvas.width + rockImage.width + Math.random() * asteroid_Interval;
    this.y = Math.random() * canvas.height;
    this.speed = 32 + ((Math.random()-0.5) * 30);
	this.wander = (Math.random() - 0.5) * 32/2;
}

var num_Boys = 10;
var boys = [num_Boys];
var boy_Interval = 100;

function Boy(x_modifier)
{
    this.width = boyImage.width;
    this.height = boyImage.height;
    this.x = canvas.width + boyImage.width + x_modifier;
    this.y = Math.random() * canvas.height;
    this.speed = 16;
}

// INITIALISATION

// Spawn asteroids
for (i = 0; i < num_Asteroids; i++) {
	asteroids[i] = new Asteroid();
}

// Spawn boys
for (i = 0; i < num_Boys; i++) {
	boys[i] = new Boy(boy_Interval * i + Math.random() * 100 - 50);
}

// RESET GAME
var reset = function () {
	
	for (i = 0; i < num_Asteroids; i++) {
		asteroids[i] = new Asteroid();
	}
	// Spawn boys
	for (i = 0; i < num_Boys; i++) {
		boys[i] = new Boy(boy_Interval * i + Math.random() * 100 - 50);
	}
	
	ship.rescues = 0;
	ship.losses = 0;
	ship.x = 5;
	ship.y = (canvas.height/2) - (shipImage.height/2);
	difficulty = 1;
};

//INPUT HANDLERS

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

addEventListener("keyup", function (e) {
	
	delete keysDown[e.keyCode];
}, false);

//Handle touch controls

// Set up mouse events
var pressing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
        pressing = true;
  lastPos = getMousePos(canvas, e);
}, false);
canvas.addEventListener("mouseup", function (e) {
  pressing = false;
}, false);
canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}

//mouse listener
canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}


//UPDATE FUNCTION
var update = function (modifier) {
	
	difficulty += modifier/10;
    
	//UPDATE INPUT
	
    if (37 in keysDown) { // Player holding left
		ship.x -= modifier * ship.speed;
	}
	if (38 in keysDown) { // Player holding up
		ship.y -= modifier * ship.speed;
	}
    if (39 in keysDown) { // Player holding right
		ship.x += modifier * ship.speed;
	}
	if (40 in keysDown) { // Player holding down
		ship.y += modifier * ship.speed;
	}
	if (32 in keysDown) { // Player holding space
		
	}
	
	if (pressing) {
		if (mousePos.x > ship.x * canvasScale)
			ship.x += modifier * ship.speed;
		if (mousePos.x < ship.x * canvasScale)
			ship.x -= modifier * ship.speed;
		if (mousePos.y > ship.y * canvasScale)
			ship.y += modifier * ship.speed;
		if (mousePos.y < ship.y * canvasScale)
			ship.y -= modifier * ship.speed;
	}
	
	//KEEP PLAYER WITHIN BOUNDS
	
	if (ship.x < 0) {ship.x = 0;}
	if (ship.x > canvas.width) {ship.x = canvas.width;}
	if (ship.y < 0) {ship.y = 0;}
	if (ship.y > canvas.height) {ship.y = canvas.height;}
	
	//UPDATE ROCKS
	
	for (i = 0; i < asteroids.length; i++) {
		asteroids[i].x -= modifier * asteroids[i].speed * difficulty;
		asteroids[i].y -= modifier * asteroids[i].wander * difficulty;
		
		if (asteroids[i].x < -10 || asteroids[i].y < -10 ||  asteroids[i].y > canvas.height + 10 ) {
			asteroids[i] = new Asteroid();
			continue;
		}
		
		if (Math.abs(asteroids[i].x - ship.x) < 8 && Math.abs(asteroids[i].y - ship.y) < 8) {
			//HIT
			reset();
		}
	}
	
	//UPDATE BOYS
	
	for (i = 0; i < boys.length; i++) {
		boys[i].x -= modifier * boys[i].speed * difficulty;
		
		
		if (boys[i].x < -10 || boys[i].y < -10 ||  boys[i].y > canvas.height + 10 ) {
			boys.splice(i,1);
			ship.losses++;
			continue;
		}
		
		if (Math.abs(boys[i].x - ship.x) < 8 && Math.abs(boys[i].y - ship.y) < 8) {
			//RESCUE
			boys.splice(i,1);
			ship.rescues++;
		}
		
	}
	
	
	//UPDATE BACKGROUND STARS
	
	stars.brightx -= modifier * stars.brightSpeed * difficulty;
	stars.dimx -= modifier * stars.dimSpeed * difficulty;
	if (stars.brightx < - stars_brightImage.width) {
		stars.brightx = 0;
	}
	if (stars.dimx < - stars_dimImage.width) {
		stars.dimx = 0;
	}
};

// Draw everything
var render = function () {
	
	ctx.clearRect(0,0, canvas.width,canvas.height);
	
	if (stars_dimReady) {
		ctx.drawImage(stars_dimImage, stars.dimx, 0);
		ctx.drawImage(stars_dimImage, stars.dimx + stars_dimImage.width, 0);
	}
	if (stars_brightReady) {
		ctx.drawImage(stars_brightImage, stars.brightx, 0);
		ctx.drawImage(stars_brightImage, stars.brightx + stars_brightImage.width, 0);
	}
	if (boyReady) {
		for (i = 0; i < boys.length; i++) {
			ctx.drawImage(boyImage, boys[i].x - boyImage.width/2, boys[i].y - boyImage.height/2);
		}
	}

	if (shipReady) {
		ctx.drawImage(shipImage, ship.x - shipImage.width/2, ship.y - shipImage.height/2);
	}
	if (rockReady) {
		for (i = 0; i < asteroids.length; i++) {
			ctx.drawImage(rockImage, asteroids[i].x - rockImage.width/2, asteroids[i].y - rockImage.height/2);
		}
	}
	
	//RENDER UI
	
	ctx.font = "4px";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#fff";
	ctx.fillText("BOYS RESCUED: " + ship.rescues, 4, 4);
	ctx.fillText("BOYS LOST: " + ship.losses, 4, 114);
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

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);
document.body.addEventListener("touchend", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);
document.body.addEventListener("touchmove", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);

main();






