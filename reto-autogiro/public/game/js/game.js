var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: jugabilidad.mundo.gravedad }
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

    orquestador = new Orquestador(this);
    orquestador.preload();

    player = new Player(this);
    player.preload();

    comm = new Comunicaciones(orquestador);
    comm.connect();
    orquestador.setComunicaciones(comm);


}

function create ()
{
    this.add.image(400, 300, 'sky');

    orquestador.create();
    player.create();




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
