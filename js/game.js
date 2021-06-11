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

//
function init() {
}

function preload() {
    this.load.image('background', './assets/romain-01.png');
    
    this.load.image('head', './assets/head-01.png');
    this.load.image('body', './assets/body-01.png');
    this.load.image('handL', './assets/handL-01.png');
    this.load.image('handR', './assets/handR-01.png');
    this.load.image('shoulderL', './assets/shoulderL-01.png');
    this.load.image('shoulderR', './assets/shoulderR-01.png');
    this.load.image('hips', './assets/hips-01.png');
    this.load.image('legL', './assets/legL-01.png');
    this.load.image('legR', './assets/legR-01.png');
    
    this.load.image('nextArrow', './assets/blue-arrow.png');

}

function create() {    
    var image = this.add.image(200, 300, 'background');
    image.alpha = 0.3;
    
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
    var zone2 = this.add.zone(197, 298, 70, 70).setRectangleDropZone(70, 70);
    zone2.setName('body');
    
    //  A drop zone
    var zone3 = this.add.zone(104, 292, 50, 50).setRectangleDropZone(50, 50);
    zone3.setName('handL');
    
    
    //  A drop zone
    var zone4 = this.add.zone(255, 348, 40, 40).setRectangleDropZone(40, 40);
    zone4.setName('handR');
    
    //  A drop zone
    var zone5 = this.add.zone(148, 280, 30, 48).setRectangleDropZone(30, 48);
    zone5.setName('shoulderL');
    
     //  A drop zone
    var zone6 = this.add.zone(197, 378, 80, 45).setRectangleDropZone(80, 45);
    zone6.setName('hips');
    
    //  A drop zone
    var zone7 = this.add.zone(153, 444, 50, 80).setRectangleDropZone(50, 80);
    zone7.setName('legL');
    
    //  A drop zone
    var zone8 = this.add.zone(220, 444, 50, 80).setRectangleDropZone(50, 80);
    zone8.setName('legR');
    
    //  A drop zone
    var zone9 = this.add.zone(245, 290, 30, 50).setRectangleDropZone(30, 50);
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
 
     this.input.on('dragstart', function (pointer, gameObject) {

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
//        if(gameObject.name == "head" && dropZone.name == "zone1"){
//            gameObject.x = dropZone.x;
//            gameObject.y = dropZone.y;
//
//            gameObject.input.enabled = false;
//            console.log(dropZone.name);
//            console.log(gameObject.name);
//
//            console.log(gameObject.name === "head");
//            console.log(dropZone.name === "zone1");
//            console.log(gameObject.name + " was dropped off in " + dropZone.name); 
//        }
//        
//        if(gameObject.name == "body" && dropZone.name == "zone2"){
//            gameObject.x = dropZone.x;
//            gameObject.y = dropZone.y;
//
//            gameObject.input.enabled = false;
//            console.log(dropZone.name);
//            console.log(gameObject.name);
//
//            console.log(gameObject.name === "cat3");
//            console.log(dropZone.name === "zone1");
//            
//        }
//        
//        if(gameObject.name == "handL" && dropZone.name == "zone3"){
//            gameObject.x = dropZone.x;
//            gameObject.y = dropZone.y;
//
//            gameObject.input.enabled = false;
//            console.log(dropZone.name);
//            console.log(gameObject.name);
//
//            console.log(gameObject.name === "cat3");
//            console.log(dropZone.name === "zone1");
//            
//        }
        
//        else{
//            gameObject.x = gameObject.input.dragStartX;
//            gameObject.y = gameObject.input.dragStartY;
//            console.log('failed dropoff of ' + gameObject.name + ' in ' + dropZone.name);
//        }
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name == gameObject.name);
            console.log('successful dropoff of ' + gameObject.name + ' in ' + dropZone.name);
            
            successfulDropoff++;
            console.log(successfulDropoff);
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            console.log('failed dropoff of ' + gameObject.name + ' in ' + dropZone.name);
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
              
    }
//
//        graphics.clear();
//        graphics.lineStyle(2, 0xffff00);
//        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        
        

    });
    
    
    nextArrow.on('pointerdown', onClick);
//    var button = this.add.image(30, 160, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
//
//        button.on('pointerup', function () {
//
//            if (this.scale.isFullscreen)
//            {
//                button.setFrame(0);
//
//                this.scale.stopFullscreen();
//            }
//            else
//            {
//                button.setFrame(1);
//
//                this.scale.startFullscreen();
//            }
//
//        }, this);

}


function update() {

}
function onClick(){
//    window.open("https://www.google.com", "_blank");
    window.location.replace("http://www.w3schools.com");
                  
}