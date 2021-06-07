let config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#F49001',
    audio: {
        disableWebAudio: true
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);


//
function init() {
}

function preload() {
    this.load.image('background', './assets/pinocchio.png');

}

function create() {
var test = this.add.image(200,300, 'background');
}


function update() {

}
