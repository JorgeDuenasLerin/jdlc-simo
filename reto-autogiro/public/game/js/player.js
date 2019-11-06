class Player  {
  constructor(scene = "") {
      if (!!Player.instance) {
          return Player.instance;
      }

      Player.instance = this;

      this.scene = scene;
      this.orquestador = new Orquestador(scene);

      return this;
  }

  preload(){
    this.scene.load.spritesheet('autogiro', 'assets/autogiro_sprite.png', { frameWidth: 178, frameHeight: 128 });
  }

  create(){
    // Creamos la imagen del jugador con física
    this.spritePlayer = this.scene.physics.add.sprite(100, 100, 'autogiro');
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
    this.scene.physics.add.collider(this.spritePlayer, this.scene.edificios.grupoEdificios, this.estrellado);
  }

  estrellado() {
    console.log('estrellado');
  }

  reset(){
    this.life = 1000;
    //TODO: Hacer sistema de puntos
    this.puntos = Math.floor(Math.random() * 1000);
    this.spritePlayer.setPosition(100,100);
  }

  getPuntos(){
    return this.puntos;
  }

  play(){
    this.spritePlayer.body.setEnable(true);
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
    this.life--;
    if(this.life == 0) {

      this.orquestador.setFinJuego();
    }

    if (this.izquierda) {
        this.spritePlayer.setVelocityX(-jugabilidad.player.movimientoX);
        this.spritePlayer.setAngle(-10);

        if(!this.impulsado) {
            this.impulsado = true;
            this.spritePlayer.setVelocityY(-jugabilidad.player.impulso);
        }
    }

    if (this.derecha) {
        this.spritePlayer.setVelocityX(jugabilidad.player.movimientoX);
        this.spritePlayer.setAngle(10);

        if(!this.impulsado) {
            this.impulsado = true;
            this.spritePlayer.setVelocityY(-jugabilidad.player.impulso);
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


    /*
    if (cursors.left.isDown)
    {

        //player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {

        //player.anims.play('right', true);
    }
    else

    {
        //player.anims.play('turn');
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-jugabilidad.player.impulso);
    }*/
  }
}
