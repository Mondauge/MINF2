var game = new Phaser.Game(1280, 720, Phaser.AUTO, ' ', {preload: preload, create: create, update: update});

function preload() {
    game.load.audio('music', 'assets/fight1.mp3');

	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/stone.png');
	game.load.image('stone2', 'assets/stone2.png');
	game.load.image('bhit', 'assets/schlag.png');

	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('hitler', 'assets/hitlerbewegung.png', 185,349);
    game.load.spritesheet('putin', 'assets/putinbewegung.png', 185,349);
    game.load.spritesheet('controller', 'assets/controller-indicator.png', 16,16);

}

var platforms;

var buttonA;
//var buttonB;
//var buttonX;

var pad1;
var pad2;
//var imageH;

var player1;
var player2;

var indicator1;
var indicator2;

var counter1 = 100; 
var counter2 = 100; 

var music;

function create() {

    //Assign it so we can reference it 
    music = game.add.audio('music');
    music.loop = false;
    music.volume = 1;
    music.play();

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.input.gamepad.start();


    pad1 = game.input.gamepad.pad1;
    pad2 = game.input.gamepad.pad2;

	game.add.tileSprite (0,0,1280,720, 'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

	var ground = platforms.create(0, game.world.height - 64, 'ground');

    ground.scale.setTo(35, 2);

    ground.body.immovable = true;

    //imageH = game.add.sprite(500, 300, 'star');


    player1 =game.add.sprite(100, game.world.height - 417, 'hitler');


        indicator1 = game.add.sprite(0,0, 'controller');
    	indicator1.scale.x = indicator1.scale.y = 2;
    	indicator1.animations.frame = 1;
    	player1.anchor.setTo(0,0);

 	player2 =game.add.sprite(1080, game.world.height - 417, 'putin');

 	    indicator2 = game.add.sprite(1240,0, 'controller');
    	indicator2.scale.x = indicator2.scale.y = 2;
    	indicator2.animations.frame = 1;
    	player2.anchor.setTo(0,0);


	game.physics.arcade.enable(player1);

        player1.body.bounce.y = 0;
    	player1.body.gravity.y = 300;
    	player1.body.collideWorldBounds = true;
        player1.animations.add('left', [7]);
    	player1.animations.add('right', [6]);
        player1.animations.add('stop', [4]);
        player1.animations.add('hit', [9]);
        player1.animations.add('bhit', [0]);

 	game.physics.arcade.enable(player2);

	    player2.body.bounce.y = 0;
    	player2.body.gravity.y = 300;
    	player2.body.collideWorldBounds = true;

        player2.animations.add('left', [1]);
    	player2.animations.add('right', [0]);
        player2.animations.add('stop', [3]);
        player2.animations.add('hit', [8]);


        pad1.addCallbacks(this, { onConnect: addButtons });
}
function update() {

	game.physics.arcade.collide(player1, platforms);
	game.physics.arcade.collide(player2, platforms);

    game.physics.arcade.collide(player1, player2);

	    player1.body.velocity.x = 0;
	    player2.body.velocity.x = 0;
	    player1.body.drag.y = -150;
        player2.body.drag.y = -150;


  buttonA = pad1.getButton(Phaser.Gamepad.XBOX360_A);
  //  buttonB = pad1.getButton(Phaser.Gamepad.XBOX360_B);
  //  buttonX = pad1.getButton(Phaser.Gamepad.XBOX360_X);

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
         player1.body.velocity.x = -150;

        player1.animations.play('left');
    }
        else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
         player1.body.velocity.x = 150;

        player1.animations.play('right');
    }

    	else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)  || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.5 && player1.body.touching.down)
        {
    	player1.body.velocity.y = -250;
        }

        else if (pad1.isDown(Phaser.Gamepad.XBOX360_A)){
           // imageH.alpha = 0.5;
            player1.animations.play('hit', 'bhit');
        }

        else
        
    {
        player1.animations.play('stop');

    }


        if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
          player2.body.velocity.x = -150;

        player2.animations.play('left');
    }

        else if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
         player2.body.velocity.x = 150;

        player2.animations.play('right');
    }
        
        else if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)  || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.5 && player2.body.touching.down)
        {
        player2.body.velocity.y = -250;
        }

    else if (pad2.isDown(Phaser.Gamepad.XBOX360_A)){
            //imageH.alpha = 0.5;
            player2.animations.play('hit');
        }

        else
        
    {
        player2.animations.play('stop');

    }

    game.debug.text(counter1, 100,50 , "White", "30px Arial");
    game.debug.text(counter2, 1100,50 , "black", "30px Arial");

}

function gethit1(player1,player2){
        player1.colide;
        counter1--;


}

function gethit2(player1,player2){
        counter2--;
}

/*function addButtons() {

    //  We can't do this until we know that the gamepad has been connected and is started

    buttonA = pad1.getButton(Phaser.Gamepad.XBOX360_A);
    buttonB = pad1.getButton(Phaser.Gamepad.XBOX360_B);
    buttonX = pad1.getButton(Phaser.Gamepad.XBOX360_X);

    buttonA.onDown.add(onDown1, this);
    buttonB.onDown.add(onDown1, this);
    buttonX.onDown.add(onDown1, this);

    buttonA.onUp.add(onUp1, this);
    buttonB.onUp.add(onUp1, this);
    buttonX.onUp.add(onUp1, this);
}

function onDown1(button, value) {

    if (button.buttonCode === Phaser.Gamepad.XBOX360_A)
    {
       imageH.alpha = 0.5;
       player1.animations.play('hit', 50, true);
    }
}
//    else if (button.buttonCode === Phaser.Gamepad.XBOX360_B)
//    {

//    }
//    else if (button.buttonCode === Phaser.Gamepad.XBOX360_X)
//    {

//    }


function onUp1(button, value) {

    if (button.buttonCode === Phaser.Gamepad.XBOX360_A)
    {
        imageH.alpha = 1;
        player1.animations.play('stop', 50, true);
    }
  //  else if (button.buttonCode === Phaser.Gamepad.XBOX360_B)
   // {
   //     imageB.alpha = 1;
   // }
   // else if (button.buttonCode === Phaser.Gamepad.XBOX360_X)
   // {
   //     imageX.alpha = 1;
   // }
}*/