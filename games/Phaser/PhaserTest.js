/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/HNWSmnhX
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(400, 300, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');

}

var player;
var platforms;
var cursors;
var jumpButton;

function create() {

    player = game.add.sprite(100, 200, 'player');

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1200;

    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

var decel = 600;
var accel = 1000;

var maxSpeed = 1000;

function update () {

    game.physics.arcade.collide(player, platforms);

    if (player.body.velocity.x > 0)
    {
        player.body.velocity.x -= decel * game.time.physicsElapsed;
    }
    
    if (player.body.velocity.x < 0)
    {
        player.body.velocity.x += decel * game.time.physicsElapsed;;
    }
    
    if (Math.abs(player.body.velocity.x) < .2)
    {
        player.body.velocity.x = 0;
    }
    
    if (cursors.left.isDown)
    {
        
        if (player.body.velocity.x > -maxSpeed)
        {
            player.body.velocity.x -= accel * game.time.physicsElapsed;
        }
        else
        {
            player.body.velocity.x = -maxSpeed;
        }
        
    }
    else if (cursors.right.isDown)
    {
        
        if (player.body.velocity.x < maxSpeed)
        {
            player.body.velocity.x += accel * game.time.physicsElapsed;
        }
        else
        {
            player.body.velocity.x = maxSpeed;
        }
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
}

function render () {

}
