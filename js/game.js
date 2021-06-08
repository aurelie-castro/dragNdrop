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

}

function create() {    
    var image = this.add.image(200, 300, 'background');
    image.alpha = 0.3;
    
    
    var head = this.add.image(260, 522, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
//    head.setScale(2);
    head.setName('head');
    
    var body = this.add.image(60, 550, 'body', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(body);
    body.setName('body');
    
    var handL = this.add.image(310, 292, 'handL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handL);
    handL.setName('handL');
    
    //  A drop zone
    var zone = this.add.zone(200, 145, 200, 200).setRectangleDropZone(200, 200);
    zone.setName('zone1');
    
    //  A drop zone
    var zone2 = this.add.zone(197, 298, 70, 70).setRectangleDropZone(70, 70);
    zone2.setName('zone2');
    
    //  A drop zone
    var zone3 = this.add.zone(104, 292, 50, 50).setRectangleDropZone(50, 50);
    zone3.setName('zone3');
    
    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
    graphics.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);
    
    graphics.strokeRect(zone3.x - zone3.input.hitArea.width / 2, zone3.y - zone3.input.hitArea.height / 2, zone3.input.hitArea.width, zone3.input.hitArea.height);
 
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
        if(gameObject.name == "head" && dropZone.name == "zone1"){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name);
            console.log(gameObject.name);

            console.log(gameObject.name === "head");
            console.log(dropZone.name === "zone1");
            console.log(gameObject.name + " was dropped off in " + dropZone.name); 
        }
        
        if(gameObject.name == "body" && dropZone.name == "zone2"){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name);
            console.log(gameObject.name);

            console.log(gameObject.name === "cat3");
            console.log(dropZone.name === "zone1");
            
        }
        
        if(gameObject.name == "handL" && dropZone.name == "zone3"){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name);
            console.log(gameObject.name);

            console.log(gameObject.name === "cat3");
            console.log(dropZone.name === "zone1");
            
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

        graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    });
    
    var button = this.add.image(30, 160, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

        button.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {
                button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);

}


function update() {

}
