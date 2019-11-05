var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: jugabilidad.mundo.gravedad },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



var game = new Phaser.Game(config);

var orquestador;
var comm;



var player;
var ui;
var controlPlayer;
var sfx;
var audioStart = false;
var presentacion;
var orquestador;
/*
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
*/

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.audio('bso', 'assets/01 A Night Of Dizzy Spells.mp3');
    this.load.image('edificio_peq', 'assets/edificio_peq.png'); //,  { frameWidth: 128, frameHeight: 128 });
    this.load.image('edificio_med', 'assets/edificio_med.png'); //, { frameWidth: 128, frameHeight: 128 });
    this.load.image('edificio_grande', 'assets/edificio_grande.png');
    this.load.spritesheet('patos5', 'assets/patos5_sprite.png', { frameWidth: 128, frameHeight: 128 });



    orquestador = new Orquestador(this);
    orquestador.preload();

    player = new Player(this);
    player.preload();

    ui = new UI(this);
    ui.preload();

    comm = new Comunicaciones(orquestador);
    comm.connect();
    orquestador.setComunicaciones(comm);
}

function create ()
{
    // Fondo
    this.add.image(400, 300, 'sky');

    // Edificios
/*     this.anims.create({
        key: 'edif_peq',
        frames: this.anims.generateFrameNumbers('edificio_peq'),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'edif_med',
        frames: this.anims.generateFrameNumbers('edificio_med'),
        frameRate: 20,
        repeat: -1
    });     */

    this.terreno = this.physics.add.staticGroup();

    this.terreno.create(0,  game.config.height- 128 / 4, 'edificio_peq').setScale(.5).refreshBody();
    this.terreno.create(128/2, game.config.height - 128 / 2, 'edificio_grande').setScale(1.2).refreshBody();
    this.terreno.create(256, game.config.height - 128 / 2, 'edificio_med');
    this.terreno.create(384, game.config.height - 128 / 2, 'edificio_peq').setScale(.5).refreshBody();
    this.terreno.create(512, game.config.height - 128 / 2, 'edificio_grande').setScale(1.2).refreshBody();

/*     this.sptEdificioPeq.anims.play('edif_peq');
    this.sptEdificioMed.anims.play('edif_med'); */


    this.patos5 = this.physics.add.group({key: 'patos5', frameQuantity:2});
    var rect = new Phaser.Geom.Rectangle(200, 0, 700, 300);
    Phaser.Actions.RandomRectangle(this.patos5.getChildren(), rect);

   // this.terreno.refresh();

    orquestador.create();
    player.create();
    ui.create();

    // Entrada de teclado
    cursors = this.input.keyboard.addKeys({
        up: 'space',
        down: 'down',
        left: 'left',
        right: 'right'
    });
    remoteCursors = {};

    //controlPlayer = new Control(player, cursors, remoteCursors);

    // Sección musical
    sfx = this.sound.add('bso');

}

function update ()
{
    orquestador.update();
    player.update();

    if(!audioStart && cursors.left.isDown) {
        sfx.play();

    }

    //controlPlayer.update();
    /*
    if (subir) {
        subir = false;
        player.setVelocityY(-jugabilidad.player.impulso);
    }*/
}
