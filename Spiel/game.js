var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'db', {preload: preload, create: create, update: update});

function preload() {
    game.load.audio('music', 'assets/fight1.wav');

	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/stone.png');

    game.load.spritesheet('hitler', 'assets/hitlerbewegung.png', 185,349);
    game.load.spritesheet('putin', 'assets/putinbewegung.png', 185,349);
    game.load.spritesheet('controller', 'assets/controller-indicator.png', 16,16);
    game.load.spritesheet('healthbar', 'assets/healthbar.png',300,50 , 4);

}

var platforms;

var pad1;
var pad2;

var player1;
var player2;

var indicator1;
var indicator2;

var health1 = 100; 
var health2 = 100; 

var maxHealth = 200;

var minHealth = 0;

var healthbar1;

var bullets;


var music;

function create() {


    // Defining variables
    var style = { font: "30px Arial", fill: "#ffffff" };
    var x = game.world.width/2, y = game.world.height/2;

    // Adding a text centered on the screen
    var text = this.game.add.text(x, y-50, "Press space to start", style);
    text.anchor.setTo(0.5, 0.5); 

    //Assign it so we can reference it 
    music = game.add.audio('music');
    music.loop = true;
    music.volume = 1;
    music.play();

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.input.gamepad.start();


    pad1 = game.input.gamepad.pad1;
    pad2 = game.input.gamepad.pad2;

	game.add.tileSprite (0,0,1280,720, 'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

	var ground = platforms.create(0, game.world.height - 32, 'ground');

    ground.scale.setTo(35, 0);

    ground.body.immovable = true;


    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);


    player1 =game.add.sprite(440, game.world.height - 385, 'hitler');


        indicator1 = game.add.sprite(0,0, 'controller');
    	indicator1.scale.x = indicator1.scale.y = 2;
    	indicator1.animations.frame = 1;
    	player1.anchor.setTo(0,0);

 	player2 =game.add.sprite(640, game.world.height - 385, 'putin');

 	    indicator2 = game.add.sprite(1240,0, 'controller');
    	indicator2.scale.x = indicator2.scale.y = 2;
    	indicator2.animations.frame = 1;
    	player2.anchor.setTo(0,0);

    healthbar1 = this.game.add.sprite(100, 50,'healthbar');
        healthbar1.animations.add('pain', [2]);
        healthbar1.cropEnabled = true;
        healthbar1.crop.width = (player1.health1 / player1.maxHealth1) * healthbar1.width;

	game.physics.arcade.enable(player1);

        player1.body.bounce.y = 0;
    	player1.body.gravity.y = 300;
    	player1.body.collideWorldBounds = true;
        player1.animations.add('left', [7]);
    	player1.animations.add('right', [6]);
        player1.animations.add('stop', [4]);
        player1.animations.add('hit', [9]);
 

 	game.physics.arcade.enable(player2);

	    player2.body.bounce.y = 0;
    	player2.body.gravity.y = 300;
    	player2.body.collideWorldBounds = true;

        player2.animations.add('left', [1]);
    	player2.animations.add('right', [0]);
        player2.animations.add('stop', [3]);
        player2.animations.add('hit', [8]);

  
}
function update() {

	game.physics.arcade.collide(player1, platforms);
	game.physics.arcade.collide(player2, platforms);

    game.physics.arcade.collide(player1, player2,gethit1,null,this);

	    player1.body.velocity.x = 0;
	    player2.body.velocity.x = 0;
	    player1.body.drag.y = -150;
        player2.body.drag.y = -150;


  buttonA = pad1.getButton(Phaser.Gamepad.XBOX360_A);
  buttonB = pad1.getButton(Phaser.Gamepad.XBOX360_B);
  buttonX = pad1.getButton(Phaser.Gamepad.XBOX360_X);

  //      if (button.buttonCode === Phaser.Gamepad.XBOX360_A)
  //  {
 //       player1.animations.play('hit');
 //   }



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
         player1.body.velocity.x = -300;

        player1.animations.play('left');
    }
        else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
         player1.body.velocity.x = 300;

        player1.animations.play('right');
    }

    	else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)  || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.5 && player1.body.touching.down)
        {
    	player1.body.velocity.y = -250;
        }

        else if (pad1.isDown(Phaser.Gamepad.XBOX360_A)){
            player1.animations.play('hit');
        }


        else if (pad1.isDown(Phaser.Gamepad.XBOX360_B)){
            player1.animations.play('hit');
        }

        else if (pad1.isDown(Phaser.Gamepad.XBOX360_X)){
            player1.animations.play('hit');
        }

        else
        
    {
        player1.animations.play('stop');

    }


        if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
          player2.body.velocity.x = -300;

        player2.animations.play('left');
    }

        else if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
         player2.body.velocity.x = 300;

        player2.animations.play('right');
    }
        
        else if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)  || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.5 && player2.body.touching.down)
        {
        player2.body.velocity.y = -250;
        }

    else if (pad2.isDown(Phaser.Gamepad.XBOX360_A)){

            player2.animations.play('hit');

        }

    else if (pad2.isDown(Phaser.Gamepad.XBOX360_B)){

            player2.animations.play('hit');

        }

    else if (pad2.isDown(Phaser.Gamepad.XBOX360_X)){

            player2.animations.play('hit');

        }

        else
        
    {
        player2.animations.play('stop');

    }
    



    var healthbar2 = this.game.add.sprite(900, 50,'healthbar');
    healthbar2.cropEnabled = true;
    healthbar2.crop.width = (player2.health2 / player2.maxHealth2) * healthbar2.width;


 //   game.debug.text(health1, 100,300 , "White", "30px Arial");
 //   game.debug.text(health2, 1100,300 , "black", "30px Arial");
}


function gethit1(player1,player2){

    health1 --;


    
    healthbar1.animations.play('pain');

}

function fire (player1){

}