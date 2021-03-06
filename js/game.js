let config = {
    type: Phaser.CANVAS,
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
    backgroundColor: '#87CBF9',
    audio: {
        disableWebAudio: false
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);

let successfulDropoff;

var nextArrow;

var startSound;
var holdSound;
var wrongSound;
var correctSound;
var finishSound;

var star;
var starScale;

var gameBg;

var gameCover;
var startClicked;

//
function init() {
}

function preload() {
    //---personnage en transparence---
    this.load.image('background', './assets/romain-01.png');
    
    this.load.image('cover', './assets/pinoCOVER-01.png');
    //----membres----
    this.load.image('head', './assets/head-01.png');
    this.load.image('body', './assets/body-01.png');
    this.load.image('handL', './assets/handL-01.png');
    this.load.image('handR', './assets/handR-01.png');
    this.load.image('shoulderL', './assets/shoulderL-01.png');
    this.load.image('shoulderR', './assets/shoulderR-01.png');
    this.load.image('hips', './assets/hips-01.png');
    this.load.image('legL', './assets/legL-01.png');
    this.load.image('legR', './assets/legR-01.png');
    
    //---arrow next---
    this.load.image('nextArrow', './assets/blue-arrow.png');
    
    //---audio files---
    this.load.audio('start', './assets/start1.wav');
    this.load.audio('hold', './assets/hold.wav');
    this.load.audio('wrong', './assets/wrong.wav');
    this.load.audio('correct', './assets/correct.wav');
    this.load.audio('finish', './assets/finish.wav');
    
    //---star at the end---
    this.load.image('star', './assets/blue-star.png');
    
    //---background pattern---
    this.load.image('gameBg', './assets/feuilledroite-01-01.png');

}

function create() { 
    startClicked = false;
    
    gameCover = this.add.image(180, 320, 'cover');
    gameCover.setDepth(5);
    
    gameBg = this.add.image(180, 320, 'gameBg');
    gameBg.setVisible(false);
    gameBg.alpha = 0.8;
    
    var image = this.add.image(200, 300, 'background');
    image.alpha = 0.3;
    
    //---star---
    starScale = 0.1;
    star = this.add.image(90,530, 'star');
    star.setScale(starScale);
    star.setVisible(false);
    star.setDepth(0);
    
    //---audio---
    startSound = this.sound.add('start');
    holdSound = this.sound.add('hold');
    wrongSound = this.sound.add('wrong');
    correctSound = this.sound.add('correct');
    finishSound = this.sound.add('finish');

    //---drop off counter---
    successfulDropoff = 0;
    
    nextArrow = this.add.image(300, 550, 'nextArrow');
    nextArrow.setScale(0.7);
    nextArrow.setVisible(false);
    
    //----les membres-----
    var head = this.add.image(260, 522, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
//    head.setScale(2);
    head.setName('head');
    
    var body = this.add.image(60, 550, 'body', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(body);
    body.setName('body');
    
    var handL = this.add.image(310, 392, 'handL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handL);
    handL.setName('handL');
    
    var handR = this.add.image(140, 550, 'handR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handR);
    handR.setName('handR');
    
    var shoulderL = this.add.image(50, 120, 'shoulderL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(shoulderL);
    shoulderL.setName('shoulderL');
    
    var shoulderR = this.add.image(40, 310, 'shoulderR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(shoulderR);
    shoulderR.setName('shoulderR');
    
    var hips = this.add.image(50, 412, 'hips', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(hips);
    hips.setName('hips');
    
    var legL = this.add.image(50, 212, 'legL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(legL);
    legL.setName('legL');
    
    var legR = this.add.image(310, 302, 'legR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(legR);
    legR.setName('legR');
    
    //-----les drop zones----
    //  A drop zone
    var zone = this.add.zone(200, 146, 200, 200).setRectangleDropZone(200, 200);
    zone.setName('head');
    
    //  A drop zone
    var zone2 = this.add.zone(196, 297, 70, 100).setRectangleDropZone(70, 100);
    zone2.setName('body');
    
    //  A drop zone
    var zone3 = this.add.zone(105, 292, 55, 90).setRectangleDropZone(55, 90);
    zone3.setName('handL');
    
    
    //  A drop zone
    var zone4 = this.add.zone(255, 346, 40, 55).setRectangleDropZone(40, 55);
    zone4.setName('handR');
    
    //  A drop zone
    var zone5 = this.add.zone(149, 280, 30, 65).setRectangleDropZone(30, 65);
    zone5.setName('shoulderL');
    
     //  A drop zone
    var zone6 = this.add.zone(197, 378, 80, 55).setRectangleDropZone(80, 55);
    zone6.setName('hips');
    
    //  A drop zone
    var zone7 = this.add.zone(154, 444, 65, 80).setRectangleDropZone(65, 80);
    zone7.setName('legL');
    
    //  A drop zone
    var zone8 = this.add.zone(221, 444, 65, 80).setRectangleDropZone(65, 80);
    zone8.setName('legR');
    
    //  A drop zone
    var zone9 = this.add.zone(245, 285, 30, 70).setRectangleDropZone(30, 70);
    zone9.setName('shoulderR');
    
    
    //---drag and drop mechanics---
     this.input.on('dragstart', function (pointer, gameObject) {
         if (startClicked === true){
        this.children.bringToTop(gameObject);
              holdSound.play();
         }
       
        
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {


    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            
            successfulDropoff++;
            correctSound.play();
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            wrongSound.play();
        }
        

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
        
          if(successfulDropoff === 9){
              nextArrow.setVisible(true);
              nextArrow.setInteractive();
              finishSound.play();
              star.setVisible(true);
              gameBg.setVisible(true);
    }

    });
    
    
    nextArrow.on('pointerdown', onClick);
    
     this.input.on('pointerdown', function(pointer){
        if(pointer.x >= 24 && pointer.x <= 150  && pointer.y >= 225 && pointer.y <=351 && startClicked === false){
            startSound.play();
            setTimeout(function(){ 
                startClicked = true; 
                gameCover.setVisible(false);
            }, 600);

}});

}

function update() {
    if(successfulDropoff === 9){
         starScale += 0.001;
        star.setScale(starScale);
        if (starScale > 0.2){
            starScale = 0.2;
        } 
    }

}
function onClick(){
    window.location.replace("https://games.caramel.be/geppetto/index.html");
                  
}
