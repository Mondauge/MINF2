var DictatorBeatdown = new Phaser.Game(1280, 720, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {

// game.load.image.('sky' 'assets/sky.png')
}

var platforms;

function create() {

game.physics.startSystem(Phaser.Physics.ARCADE);

//game.add.sprite (0,0, 'sky');

}

function update() {

}