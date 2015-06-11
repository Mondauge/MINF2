var game = new Phaser.Game(800, 600, Phaser.AUTO, ' ', {preload: preload, create: create, update: update});

function preload() {

	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/stone.png');
	game.load.image('stone2', 'assets/stone2.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var platforms;

var pad1;
var pad2;

var player1;
var player2;

var indicator1;
var indicator2

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.input.gamepad.start();

	game.add.tileSprite (0,0,800,600, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

	var ground = platforms.create(0, game.world.height - 64, 'ground');

    ground.scale.setTo(20, 2);

    ground.body.immovable = true;

    var ledge = platforms.create(100, 400, 'stone2');
      ledge.body.immovable = true;

    var ledge = platforms.create(140, 400, 'stone2');
      ledge.body.immovable = true;

    var ledge = platforms.create(180, 400, 'stone2');
      ledge.body.immovable = true;

	var ledge = platforms.create(700, 400, 'stone2');
	  ledge.body.immovable = true;

	var ledge = platforms.create(660, 400, 'stone2');
	  ledge.body.immovable = true;

	var ledge = platforms.create(620, 400, 'stone2');
	  ledge.body.immovable = true;

	var ledge = platforms.create(480, 250, 'stone2');
	  ledge.body.immovable = true;

	var ledge = platforms.create(440, 250, 'stone2');
	  ledge.body.immovable = true;

	var ledge = platforms.create(360, 250, 'stone2');
	  ledge.body.immovable = true;

	var ledge = platforms.create(320, 250, 'stone2');
	  ledge.body.immovable = true;





    player1 =game.add.sprite(32, game.world.height - 150, 'dude');

        indicator1 = game.add.sprite(10,10, 'stone2');
    	indicator1.scale.x = indicator1.scale.y = 2;
    	indicator1.animations.frame = 1;
    	    player1.anchor.setTo(0,0);

 	player2 =game.add.sprite(64, game.world.height - 150, 'dude');

 	    indicator2 = game.add.sprite(10,50, 'controller-indicator');
    	indicator2.scale.x = indicator2.scale.y = 2;
    	indicator2.animations.frame = 1;
    		player1.anchor.setTo(0,0);

	game.physics.arcade.enable(player1);

        player1.body.bounce.y = 0.2;
    	player1.body.gravity.y = 300;
    	player1.body.collideWorldBounds = true;
        player1.animations.add('left', [0, 1, 2, 3], 10, true);
    	player1.animations.add('right', [5, 6, 7, 8], 10, true);
 	
 	game.physics.arcade.enable(player2);

	    player2.body.bounce.y = 0.2;
    	player2.body.gravity.y = 300;
    	player2.body.collideWorldBounds = true;

        player2.animations.add('left', [0, 1, 2, 3], 10, true);
    	player2.animations.add('right', [5, 6, 7, 8], 10, true);

    	pad1 = game.input.gamepad.pad1;
		pad2 = game.input.gamepad.pad2;
}


function update() {

	game.physics.arcade.collide(player1, platforms);
	game.physics.arcade.collide(player2, platforms);

	    player1.body.velocity.x = 0;
	    player2.body.velocity.x = 0;
	    player1.body.drag.y = -100;
        player2.body.drag.y = -100;


    if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
        indicator1.animations.frame = 0;
    } else {
        indicator1.animations.frame = 1;
    }
    if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad2.connected) {
        indicator2.animations.frame = 0;
    } else {
        indicator2.animations.frame = 1;
    }

        if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
         player1.body.velocity.x = -150;

        player1.animations.play('left');
    }

        if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
         player1.body.velocity.x = 150;

        player1.animations.play('right');
    }

    	if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)  || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.5 && player1.body.touching.down)
    {
    	player1.body.velocity.y = -250;
    }

        if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
          player2.body.velocity.x = -150;

        player2.animations.play('left');
    }

        if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
         player2.body.velocity.x = 150;

        player2.animations.play('right');
    }
        
        if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)  || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.5 && player2.body.touching.down)
    {
        player2.body.velocity.y = -250;
    }

}