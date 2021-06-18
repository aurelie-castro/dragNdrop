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
    backgroundColor: '#ADD8E6',
    audio: {
        disableWebAudio: true
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);

let successfulDropoff;

var nextArrow;

var holdSound;
var wrongSound;
var correctSound;
var finishSound;

var star;

var gameBg;

//
function init() {
}

function preload() {
    //---personnage en transparence---
    this.load.image('background', './assets/romain-01.png');
    
    
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
    gameBg = this.add.image(200, 300, 'gameBg');
    
    var image = this.add.image(200, 300, 'background');
    image.alpha = 0.3;
    
    //---star---
    star = this.add.image(200,200, 'star');
    star.setScale(0.5);
    star.setVisible(false);
    star.setDepth(0);
    
    //---audio---
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
    
    var shoulderL = this.add.image(50, 80, 'shoulderL', Phaser.Math.RND.pick(frames)).setInteractive();
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
    var zone = this.add.zone(200, 145, 200, 200).setRectangleDropZone(200, 200);
    zone.setName('head');
    
    //  A drop zone
    var zone2 = this.add.zone(196, 297, 70, 100).setRectangleDropZone(70, 100);
    zone2.setName('body');
    
    //  A drop zone
    var zone3 = this.add.zone(104, 292, 55, 70).setRectangleDropZone(55, 70);
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
    
    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
    graphics.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);
    
    graphics.strokeRect(zone3.x - zone3.input.hitArea.width / 2, zone3.y - zone3.input.hitArea.height / 2, zone3.input.hitArea.width, zone3.input.hitArea.height);
    
    graphics.strokeRect(zone4.x - zone4.input.hitArea.width / 2, zone4.y - zone4.input.hitArea.height / 2, zone4.input.hitArea.width, zone4.input.hitArea.height);
    
    graphics.strokeRect(zone5.x - zone5.input.hitArea.width / 2, zone5.y - zone5.input.hitArea.height / 2, zone5.input.hitArea.width, zone5.input.hitArea.height);
    
    graphics.strokeRect(zone6.x - zone6.input.hitArea.width / 2, zone6.y - zone6.input.hitArea.height / 2, zone6.input.hitArea.width, zone6.input.hitArea.height);
    
    graphics.strokeRect(zone7.x - zone7.input.hitArea.width / 2, zone7.y - zone7.input.hitArea.height / 2, zone7.input.hitArea.width, zone7.input.hitArea.height);
    
    graphics.strokeRect(zone8.x - zone8.input.hitArea.width / 2, zone8.y - zone8.input.hitArea.height / 2, zone8.input.hitArea.width, zone8.input.hitArea.height);
    
    graphics.strokeRect(zone9.x - zone9.input.hitArea.width / 2, zone9.y - zone9.input.hitArea.height / 2, zone9.input.hitArea.width, zone9.input.hitArea.height);
 
    
    //---drag and drop mechanics---
     this.input.on('dragstart', function (pointer, gameObject) {
         holdSound.play();
        this.children.bringToTop(gameObject);
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {

        graphics.clear();
        graphics.lineStyle(2, 0x00ffff);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        console.log(gameObject.name);

    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name == gameObject.name);
            console.log('successful dropoff of ' + gameObject.name + ' in ' + dropZone.name);
            
            successfulDropoff++;
            console.log(successfulDropoff);
            correctSound.play();
            console.log(gameObject.depth);
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            console.log('failed dropoff of ' + gameObject.name + ' in ' + dropZone.name);
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
        console.log("well done!!!!");
              nextArrow.setVisible(true);
              nextArrow.setInteractive();
              finishSound.play();
              star.setVisible(true);              
    }

    });
    
    
    nextArrow.on('pointerdown', onClick);

}


function update() {

}
function onClick(){
//    window.open("https://www.google.com", "_blank");
    window.location.replace("http://www.w3schools.com");
                  
}