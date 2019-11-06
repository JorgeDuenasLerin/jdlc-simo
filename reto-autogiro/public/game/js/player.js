var INCREMENTO = 1;

class Player  {
  constructor(scene = "") {
      if (!!Player.instance) {
          return Player.instance;
      }

      Player.instance = this;

      this.scene = scene;
      this.orquestador = new Orquestador(scene);
      this.jugando = false;

      return this;
  }

  preload(){
    this.scene.load.spritesheet('autogiro', 'assets/autogiro_sprite.png', { frameWidth: 125, frameHeight: 88 });
    this.scene.load.audio('sndEdificio', 'assets/lose.wav');
  }

  create(){
    // Creamos la imagen del jugador con física
    this.spritePlayer = this.scene.physics.add.sprite(100, 100, 'autogiro');
    //this.spritePlayer.setDisplaySize(50,25);
    this.spritePlayer.setOrigin(0,0);
    this.spritePlayer.setCollideWorldBounds(true);
    this.spritePlayer.body.setEnable(false);

    // Animación del helicóptero
    this.scene.anims.create({
      key: 'volar',
      frames: this.scene.anims.generateFrameNumbers('autogiro'),
      frameRate: 20,
      repeat: -1
    });

    this.spritePlayer.anims.play('volar');

    // Colisión entre helicóptero y edificios
    this.scene.physics.add.collider(this.spritePlayer, this.scene.edificios.grupoEdificios, this.estrellado, null, this);

    // Sonido
    this.sndEdificio = this.scene.sound.add('sndEdificio');
  }

  estrellado() {
    // player global
    player.estrellado = true;
    this.sndEdificio.play();
    console.log('edificio');
  }

  reset(){
    this.puntos = 0;
    this.estrellado = false;
    this.spritePlayer.setPosition(100,100);
    this.spritePlayer.setVelocityX(0);
    this.spritePlayer.setVelocityY(0);
    this.spritePlayer.setAngle(0);
  }

  getPuntos(){
    return this.puntos;
  }

  play(){
    this.spritePlayer.body.setEnable(true);
    this.jugando = true;
  }

  noPlay(){
    this.spritePlayer.body.setEnable(false);
    this.jugando = false;
  }

  setSubir() {
    this.subir = true;
  }

  setIzquierda() {
    this.izquierda = true;
    this.derecha = false;
    this.impulsado = false;
  }

  setDerecha() {
    this.derecha = true;
    this.izquierda = false;
    this.impulsado = false;
  }

  update(){
    if(!this.jugando) {
      return;
    }

    if(this.estrellado) {
      this.noPlay(); // Game over
      this.orquestador.setFinJuego();
      return;
    } else {
      this.puntos += INCREMENTO;
    }

    if (this.izquierda) {
        this.spritePlayer.setVelocityX(-jugabilidad.player.movimientoX);
        this.spritePlayer.setAngle(-10);

        if(!this.impulsado) {
            this.impulsado = true;
            this.spritePlayer.setVelocityY(-jugabilidad.player.impulso / 3);
        }
    }

    if (this.derecha) {
        this.spritePlayer.setVelocityX(jugabilidad.player.movimientoX);
        this.spritePlayer.setAngle(10);

        if(!this.impulsado) {
            this.impulsado = true;
            this.spritePlayer.setVelocityY(-jugabilidad.player.impulso / 3);
        }
    }

    if (this.subir) {
        this.subir = false;
        this.derecha = false;
        this.izquierda = false;

        this.spritePlayer.setVelocityX(0);
        this.spritePlayer.setAngle(0);

        this.spritePlayer.setVelocityY(-jugabilidad.player.impulso);
    }
  }
}
