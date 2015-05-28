var DictatorBeatdown = new Phaser.Game(1280, 720, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {

game.load.tilemap('map', 'MINF2SPIEL/assets/map.json', null, Phaser.Tilemap.Tiled_JSON);

game.load.image('sky' 'MINF2SPIEL/assets/sky.png');

game.load.image('stone' 'MINF2SPIEL/assets/stone.png');
}

function create() {

}

function update() {

}