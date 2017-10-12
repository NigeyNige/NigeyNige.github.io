var canvas = document.getElementById("Canvas_mls4");
var ctx = canvas.getContext("2d");

//Panel Image
var panelReady = false;
var panelImage = new Image();
panelImage.onload = function ()
{
	panelReady = true;
};
panelImage.src = "mls4/img_panel_base.png";


//Lights Image
var lightsReady = false;
var lightsImage = new Image();
lightsImage.onload = function ()
{
	lightsReady = true;
};
lightsImage.src = "mls4/img_panel_lights.png";


// Game objects
var panel = {
    lights: false,
    meter_q: 0,
    meter_w: 0.5,
    meter_e: 1
};


var reset = function () {
    
};


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Update function
var update = function (modifier) {
    
    //panel.lights = false;
    
    if (81 in keysDown) { // Player holding q
		panel.meter_q += modifier;
	}
	if (65 in keysDown) { // Player holding a
		panel.meter_q -= modifier;
	}
    if (87 in keysDown) { // Player holding w
		panel.meter_w += modifier;
	}
	if (83 in keysDown) { // Player holding s
		panel.meter_w -= modifier;
	}
    if (69 in keysDown) { // Player holding e
		panel.meter_e += modifier;
	}
	if (68 in keysDown) { // Player holding d
		panel.meter_e -= modifier;
	}
	if (32 in keysDown) { // Player holding space
		panel.lights = true;
	}
};

// Draw everything
var render = function () {
	
	ctx.clearRect(0,0, canvas.width,canvas.height);
	
	if (panelReady) {
		ctx.drawImage(panelImage, 0, 0);
	}

	if (lightsReady) {
        if (panel.lights) {
		  ctx.drawImage(lightsImage, 0, 0);
        }
	}
    
    ctx.fillRect(15,24,2,18);
    ctx.fillRect(24,24,2,18);
    ctx.fillRect(33,24,2,18);

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