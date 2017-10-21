/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/HNWSmnhX
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(256, 128, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create, update: update, render: render });


/*
    0=space
    1=cell
*/


var map = [
    [1,1,1,1,1,0,0,0,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,0,1,0],
    [0,0,0,0,1,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,0,1,1,1,0,0],
    [0,0,0,0,1,0,0,0,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1]
];


function preload() {

    game.stage.backgroundColor = '#000';

    game.load.crossOrigin = 'anonymous';

    game.load.image('cell', 'res/sprites/img_cell.png');
    game.load.image('player', 'res/sprites/img_princess.png');
    game.load.image('stars_bright', 'res/sprites/img_stars_bright.png');
    game.load.image('stars_dim', 'res/sprites/img_stars_dim.png');
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.refresh();


}

var player = {
    cellX:4,
    cellY:5
};

var cursors;
var actionButton;

var justClicked = false;

var cellSize = 16;

var shipX = cellSize*2;
var shipY = cellSize*1.5;

var stars = {
    dimx: 0,
    brightx: 0,
	dimSpeed: .16,
	brightSpeed: .1
};

var stars_bright;
var stars_dim;

function create() {
    
    
    stars_bright = game.add.sprite(0, 0, 'stars_bright');
    stars_dim = game.add.sprite(0, 0, 'stars_dim');
    stars_bright2 = game.add.sprite(256, 0, 'stars_bright');
    stars_dim2 = game.add.sprite(256, 0, 'stars_dim');
    
    for(var y = 0; y < map.length; y++) {
        var mapx = map[y];
        for(var x = 0; x < mapx.length; x++) {
            if (map[y][x] == 1) {
                var cell = game.add.sprite(shipX + cellSize*x - cellSize/2, shipY + cellSize*y - cellSize/2, 'cell');
                cell.arrayX = x;
                cell.arrayY = y;
                cell.x = shipX + cellSize*x - cellSize/2;
                cell.y = shipY + cellSize*y - cellSize/2;
                cell.type = map[y][x];
                //cellMap[y][x] = cell;
                
            }
        }
    }    
    
    player.sprite = game.add.sprite(shipX + player.cellX * cellSize - cellSize/2, shipY + player.cellY * cellSize - cellSize/2, 'player');
    
    cursors = game.input.keyboard.createCursorKeys();
    actionButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.mouse.capture = true;

}

var clickTimer = 0;

function update () {
    
	//UPDATE VISUALS
	//background
	stars_bright.x -= game.time.elapsed * stars.brightSpeed;
	stars_dim.x -= game.time.elapsed * stars.dimSpeed;
	stars_bright2.x -= game.time.elapsed * stars.brightSpeed;
	stars_dim2.x -= game.time.elapsed * stars.dimSpeed;
    
	if (stars_bright.x < - stars_bright.width) {
		stars_bright.x = 0;
		stars_bright2.x = 256;
	}
	if (stars_dim.x < - stars_dim.width) {
		stars_dim.x = 0;
		stars_dim2.x = 256;
	}
	
	//player
    player.sprite.x = shipX + player.cellX * cellSize - cellSize/2;
	player.sprite.y = shipY + player.cellY * cellSize - cellSize/2;
	
	//UPDATE CONTROLS
    if (game.input.activePointer.leftButton.isDown) {
		
	}
	
    if (cursors.up.isDown) {
		playerMove("UP");
	}
    if (cursors.down.isDown) {
		playerMove("DOWN");
	}
    if (cursors.left.isDown) {
		playerMove("LEFT");
	}
    if (cursors.right.isDown) {
		playerMove("RIGHT");
	}
}

function render () {
    
}

function playerMove(direction) {
	
	if (direction == "UP") {
		//alert("moving from " + player.cellY + " into " + map[player.cellX][player.cellY - 1]);
		if (map[player.cellX][player.cellY - 1] == 1) {
			player.cellY -= 1;
		}
	}
	if (direction == "DOWN") {
		//alert("moving from " + player.cellY + " into " + map[player.cellX][player.cellY - 1]);
		if (map[player.cellX][player.cellY + 1] == 1) {
			player.cellY += 1;
		}
	}
	if (direction == "LEFT") {
		//alert("moving from " + player.cellY + " into " + map[player.cellX][player.cellY - 1]);
		if (map[player.cellX - 1][player.cellY] == 1) {
			player.cellX -= 1;
		}
	}
	if (direction == "RIGHT") {
		//alert("moving from " + player.cellY + " into " + map[player.cellX][player.cellY - 1]);
		if (map[player.cellX + 1][player.cellY] == 1) {
			player.cellX += 1;
		}
	}
	
}

function findCellClosestTo(mouseX, mouseY) {
	
	var result;    
	var maxDist = 99999;
	var curDist = maxDist;
	
    for(var y = 0; y < cellMap.length; y++) {
        var cellMapx = cellMap[y];
        for(var x = 0; x < cellMapx.length; x++) {
            if (cellMap[y][x].type == 1) {
				var cx = cellMap[y][x].x;
				var cy = cellMap[y][x].y;
				var testDist = Phaser.Math.distance(mouseX - cellSize/2,mouseY - cellSize/2,cx,cy);
				if (testDist < curDist) {
					curDist = testDist;
					result = cellMap[y][x];
				}
			}
        }
    }
	
	return result;
}