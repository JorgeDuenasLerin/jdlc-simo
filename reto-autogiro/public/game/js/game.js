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
    console.log(game);
    this.load.image('sky', 'assets/sky.png');
    this.load.audio('bso', 'assets/01 A Night Of Dizzy Spells.mp3');

    this.load.spritesheet('pato', 'assets/pato_sprite.png', { frameWidth: 63, frameHeight: 38 });

    orquestador = new Orquestador(this);
    orquestador.preload();

    player = new Player(this);
    player.preload();
    // Edificios
   
    this.edificios = new Edificio(this);
    this.edificios.preload();

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



    this.anims.create({
        key: 'volar_p',
        frames: this.anims.generateFrameNumbers('pato'),
        frameRate: 20,
        repeat: -1
      });
    //this.pato.anims.play('volar');

/*     this.patos5 = this.physics.add.group({key: 'patos5', frameQuantity:2, dragY: 0, velocityX: -200, allowGravity:false });
    var rect = new Phaser.Geom.Rectangle(200, 0, 700, 300);
    Phaser.Actions.RandomRectangle(this.patos5.getChildren(), rect); */

    orquestador.create();
    this.edificios.create();
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

    // Evento para mostrar los enemigos(patos)
     this.time.addEvent({
        delay: 2000,
        callback: patos,
        callbackScope: this,
        loop: true
      });
      this.patos = this.physics.add.group({  dragY: 0, velocityX: -200, allowGravity:false });
      this.patos.enableBody = true;
      this.physics.add.collider(player.spritePlayer, this.patos, player.estrellado);
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

    this.edificios.update();
}


function patos() {

    for(let i = 0; i < 1; i++) {
        this.pato = this.physics.add.sprite(
            Phaser.Math.Between(game.config.width + 10, game.config.width + 50), 
            Phaser.Math.Between(0, game.config.height - 120), 'pato');
        this.pato.anims.play('volar_p');
        this.patos.add(this.pato);
    }

    // Muchos patos
    console.log('patos:', this.patos.children.size)
}
