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
    var image = this.add.image(200, 300, 'background', Phaser.Math.RND.pick(frames)).setInteractive();
    
    this.input.setDraggable(image);
    
    //  A drop zone
    var zone = this.add.zone(500, 300, 50, 50).setRectangleDropZone(50, 50);
    zone.setName('zone1');
    
    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
 
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
        if(gameObject.name == "cat3" && dropZone.name == "zone1"){
            graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        }

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == "cat3" && dropZone.name == "zone4"){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name);
            console.log(gameObject.name);

        console.log(gameObject.name === "cat3");
        console.log(dropZone.name === "zone1");
            
        }else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
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

}


function update() {

}
