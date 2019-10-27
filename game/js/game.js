var jugabilidad = {
    mundo: {
        gravedad: 200 // Valor que no tiene relación con magnitud física
    },
    player: {
        movimientoY: 60,
        impulso: 100
    }
}

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

var player;
var sfx;
var audioStart = false;
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
    this.load.image('autogiro', 'assets/autogiro.png');
    this.load.audio('bso', 'assets/01 A Night Of Dizzy Spells.mp3');
}

function create ()
{
    this.add.image(400, 300, 'sky');

    // Creamos la imagen del jugador con física
    player = this.physics.add.sprite(100, 100, 'autogiro');
    player.setCollideWorldBounds(true);

    // Entrada de teclado
    cursors = this.input.keyboard.addKeys({
        up: 'space',
        down: 'down',
        left: 'left',
        right: 'right'
    });

    // Sección musical
    sfx = this.sound.add('bso');

}

function update ()
{
    if(!audioStart && cursors.left.isDown) {
        sfx.play();
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-jugabilidad.player.movimientoY);
        player.setAngle(-10);
        //player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(jugabilidad.player.movimientoY);
        player.setAngle(10);
        //player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.setAngle(0);
        //player.anims.play('turn');
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-jugabilidad.player.impulso);
    }
}
