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
    this.load.audio('bso', 'assets/BSO.mp3',{
        mute: false,
        volume: 0.8,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    });

    this.load.audio('fxsubir', 'assets/fxsubir.mp3');
    this.load.audio('gameover', 'assets/gameover.mp3');

    this.load.audio('sndPato', 'assets/lose.wav');

    this.load.spritesheet('pato', 'assets/pato_sprite.png', { frameWidth: 53, frameHeight: 32 });

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

    // Animación pato
    this.anims.create({
        key: 'volar_p',
        frames: this.anims.generateFrameNumbers('pato'),
        frameRate: 10,
        repeat: -1
      });

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
    this.sndPato = this.sound.add('sndPato');
    this.fxsubir = this.sound.add('fxsubir');
    this.gameover = this.sound.add('gameover');

    // Evento para mostrar los enemigos(patos)
     this.time.addEvent({
        delay: 2500,
        callback: agregarPato,
        callbackScope: this,
        loop: true
      });

      // Grupo de patos en pantalla
      this.patos = this.physics.add.group({
        defaultKey: 'pato',
        maxSize: 20,
        allowGravity:false,
    });
    this.patos.enableBody = true;

    // Patos sobre helicóptero
    this.physics.add.overlap(player.spritePlayer, this.patos, estrelladoPato, null, this);
}

function estrelladoPato() {
    player.estrellado = true;
    this.sndPato.play();
    console.log('patomenos')
}

function update ()
{
    orquestador.update();
    player.update();

    if(!audioStart && cursors.left.isDown) {
        sfx.setLoop(true);
        sfx.play();
    }

    // Mover edificios
    this.edificios.update();

    // Matar los patos fuera de pantalla
    for (var i = 0; i < this.patos.getChildren().length; i++) {
        var pato = this.patos.getChildren()[i];
        if (pato.x < -pato.displayWidth)  {
            this.patos.killAndHide(pato);
        }
      }

}

function agregarPato() {
    var pato = this.patos.get(
        Phaser.Math.Between(game.config.width + 10, game.config.width + 50),
        Phaser.Math.Between(0, game.config.height - 120));

    if (!pato) return; // No hay patos

    pato
    .setScale(Phaser.Math.Between(7,10)/10)
    .setActive(true)
    .setVisible(true)
    .play('volar_p')
    .body.velocity.x = -Phaser.Math.Between(150,225);
}
