var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'db', {preload: preload, create: create, update: update});

function preload() {
    game.load.audio('music', 'assets/fight1.wav');
    game.load.audio('schlag', 'assets/punch.wav');
    game.load.audio('lazor', 'assets/laser.mp3');

	game.load.image('sky', 'assets/sky.png');

    game.load.spritesheet('hitler', 'assets/hitlerbewegung.png', 185, 349, 18);
    game.load.spritesheet('putin', 'assets/putinbewegung.png', 185, 349, 17);
    game.load.spritesheet('controller', 'assets/controller-indicator.png', 16,16);
    game.load.spritesheet('healthbar1', 'assets/healthbar1.png', 382, 82);
    game.load.spritesheet('healthbar2', 'assets/healthbar2.png', 382, 82);
    game.load.spritesheet('bullet1', 'assets/BULLETrechts.png', 80, 50);
    game.load.spritesheet('bullet2', 'assets/BULLETlinks.png', 80, 50);

}

var platforms;

var pad1;
var pad2;

var player1;
var player2;

var indicator1;
var indicator2;

var health1 = 20; 
var health2 = 20; 

var maxHealth = 20;

var healthbar1;
var healthbar2;

var bullets1;
var bullets2;

var fireRate1 = 1000;
var nextFire1 = 1;

var fireRate2 = 1000;
var nextFire2 = 1;

var punchRate1 = 500;
var nextPunch1 = 1;

var punchRate2 = 500;
var nextPunch2 = 1;

var music;
var schlag;
var lazor;


function create() {


    var style = { font: "30px Arial", fill: "#ffffff" };
    var x = game.world.width/2, y = game.world.height/2;

    var text = this.game.add.text(x, y-50, "Press space to start", style);
    text.anchor.setTo(0.5, 0.5); 

    music = game.add.audio('music');
    music.loop = true;
    music.volume = 0.5;
    music.play();

    schlag = game.add.audio('schlag');
    lazor = game.add.audio('lazor');

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

    bullets1 = game.add.group();
    bullets1.enableBody = true;
    bullets1.physicsBodyType = Phaser.Physics.ARCADE;
    bullets1.createMultiple(30, 'bullet1', 0, false);
    bullets1.setAll('anchor.x', 0.5);
    bullets1.setAll('anchor.y', 0.5);
    bullets1.setAll('outOfBoundsKill', true);
    bullets1.setAll('checkWorldBounds', true);

    bullets2 = game.add.group();
    bullets2.enableBody = true;
    bullets2.physicsBodyType = Phaser.Physics.ARCADE;
    bullets2.createMultiple(30, 'bullet1', 0, false);
    bullets2.setAll('anchor.x', 0.5);
    bullets2.setAll('anchor.y', 0.5);
    bullets2.setAll('outOfBoundsKill', true);
    bullets2.setAll('checkWorldBounds', true);

    player1 = game.add.sprite(440, game.world.height - 385, 'hitler');

        indicator1 = game.add.sprite(0,0, 'controller');
    	indicator1.scale.x = indicator1.scale.y = 2;
    	indicator1.animations.frame = 1;
    	player1.anchor.setTo(0,0);


 	player2 =game.add.sprite(640, game.world.height - 385, 'putin');

 	    indicator2 = game.add.sprite(1240,0, 'controller');
    	indicator2.scale.x = indicator2.scale.y = 2;
    	indicator2.animations.frame = 1;
    	player2.anchor.setTo(0,0);

    healthbar1 = this.game.add.sprite(100, 50,'healthbar1');

	game.physics.arcade.enable(player1);

        player1.body.bounce.y = 0;
    	player1.body.gravity.y = 300;
    	player1.body.collideWorldBounds = true;

        player1.animations.add('left', [1]);
    	player1.animations.add('right', [6]);
        player1.animations.add('stop', [4]);
        player1.animations.add('hit', [17]);
        player1.animations.add('shoot', [8]);
        player1.animations.add('block', [10]);
        player1.animations.add('winMh', [15]);
        player1.animations.add('loseMh', [13]);
 

 	game.physics.arcade.enable(player2);

	    player2.body.bounce.y = 0;
    	player2.body.gravity.y = 300;
    	player2.body.collideWorldBounds = true;

        player2.animations.add('left', [1]);
    	player2.animations.add('right', [6]);
        player2.animations.add('stop', [3]);
        player2.animations.add('hit', [16]);
        player2.animations.add('shoot', [9]);
        player2.animations.add('block', [11]);
        player2.animations.add('winP', [15]);
        player2.animations.add('loseP', [13]);
}

function update() {

	game.physics.arcade.collide(player1, platforms);
	game.physics.arcade.collide(player2, platforms);
    game.physics.arcade.overlap(bullets2, player1, bulletHitPlayer1, null, this);
    game.physics.arcade.overlap(bullets1, player2, bulletHitPlayer2, null, this);
    game.physics.arcade.overlap(player1, player2);
    game.physics.arcade.overlap(player2, player1);


	player1.body.velocity.x = 0;
    player2.body.velocity.x = 0;	    
    player1.body.drag.y = -150;
    player2.body.drag.y = -150;
    player1.block1 = false;
    player2.block2 = false;
    player1.body.setSize(185, 349, 0, 0);
    player2.body.setSize(185, 349, 0, 0);

    if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected && player1.alive && player2.alive) {
        indicator1.animations.frame = 0;
    } else {
        indicator1.animations.frame = 1;
    }
    if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad2.connected && player1.alive && player2.alive) {
        indicator2.animations.frame = 0;
    } else {
        indicator2.animations.frame = 1;
    }

        if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 && player1.alive && player2.alive)
    {
         player1.body.velocity.x = -300;

        player1.animations.play('left');
    }
        else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 && player1.alive && player2.alive)
    {
         player1.body.velocity.x = 300;

        player1.animations.play('right');
    }

    	else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)  || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.5 && player1.body.touching.down && player1.alive && player2.alive)
        {
    	player1.body.velocity.y = -250;
        }

        else if (pad1.isDown(Phaser.Gamepad.XBOX360_A) && player1.alive && player2.alive){
        
            player1.animations.play('block');
            player1.block1 = true;
        }


        else if (pad1.isDown(Phaser.Gamepad.XBOX360_B) && player1.alive && player2.alive){
          player1.animations.play('shoot');
          fire1();


        }

        else if (pad1.isDown(Phaser.Gamepad.XBOX360_X) && player1.alive && player2.alive){
                
                if(!player2.block2) {
                    game.physics.arcade.overlap(player1, player2, punch1, null, this);
                }

        } else {
        
        player1.animations.play('stop');
        
        }


    if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 && player1.alive && player2.alive) {
    player2.body.velocity.x = -300;
    player2.animations.play('left');

    } else if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 && player1.alive && player2.alive) {
        player2.body.velocity.x = 300;
        player2.animations.play('right');

    } else if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)  || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.5 && player2.body.touching.down && player1.alive && player2.alive) {
        player2.body.velocity.y = -250;
    
    } else if (pad2.isDown(Phaser.Gamepad.XBOX360_A) && player1.alive && player2.alive){

            player2.animations.play('block');
            player2.block2 = true;

    } else if (pad2.isDown(Phaser.Gamepad.XBOX360_B) && player1.alive && player2.alive){

            player2.animations.play('shoot');
            fire2();

    } else if (pad2.isDown(Phaser.Gamepad.XBOX360_X) && player1.alive && player2.alive){
            
            if(!player1.block1){
                game.physics.arcade.overlap(player2, player1, punch2, null, this);
            }
    } else {
            player2.animations.play('stop');
    }
    

    var healthbar2 = this.game.add.sprite(798, 50,'healthbar2');

    if(health2 <= 0){
        player2.kill();
        player1.animations.play('winMh');
    } else if(health1 <= 0) {
        player1.kill();
        player2.animations.play('winP');
    }

    game.debug.text(health1, 500,100 , "black", "30px Arial");
    game.debug.text(health2, 750,100 , "black", "30px Arial");
    //game.debug.text(player2.block2, 300, 300, 'black', '30px Arial');

}


function bulletHitPlayer1 (player1, bullet2) {

    bullet2.kill();
    if(!player1.block1) {
        health1 --;
    }

}

function bulletHitPlayer2 (player2, bullet1) {

    bullet1.kill();
    if(!player2.block2) {
        health2 --;
    }

}

function fire1 () {

    if (game.time.now > nextFire1 && bullets1.countDead() > 0 && player1.alive && player2.alive)
    {
        nextFire1 = game.time.now + fireRate1;

        var bullet1 = bullets1.getFirstExists(false);

        bullet1.reset(player1.x+175, player1.y+35);

        bullet1.rotation = game.physics.arcade.moveToObject(bullet1, player2, 400);
        lazor.play();
        lazor.volume = 1.5;
    }

}

function fire2 () {

    if (game.time.now > nextFire2 && bullets2.countDead() > 0 && player1.alive && player2.alive)
    {
        nextFire2 = game.time.now + fireRate2;

        var bullet2 = bullets2.getFirstExists(false);

        bullet2.reset(player2.x, player2.y+80);

        bullet2.rotation = game.physics.arcade.moveToObject(bullet2, player1, 400);
        lazor.play();
        lazor.volume = 1.5;
    }


}

function punch1 (player1, player2) {

        if(!player2.block && game.time.now > nextPunch1 && player2.alive && player1.alive) {
        nextPunch1 = game.time.now + punchRate1;
        health2 --;
        player1.animations.play('hit');
        schlag.play();
        schlag.volume = 2;
    }
}

function punch2 (player2, player1) {

        if(!player1.block && game.time.now > nextPunch2 && player1.alive && player2.alive) {
        nextPunch2 = game.time.now + punchRate2;
        health1 --;
        player2.animations.play('hit');
        schlag.play();
        schlag.volume = 2;
    }
}