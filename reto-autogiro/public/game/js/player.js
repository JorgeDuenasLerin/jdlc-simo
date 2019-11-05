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
    this.scene.load.image('autogiro', 'assets/autogiro.png');
  }

  create(){
    // Creamos la imagen del jugador con física
    this.player = this.scene.physics.add.sprite(100, 100, 'autogiro');
    this.player.setCollideWorldBounds(true);
    this.player.body.setEnable(false);
  }

  reset(){
    this.life = 1000;
    //TODO: Hacer sistema de puntos
    this.puntos = Math.floor(Math.random() * 1000);
    this.player.setPosition(100,100);
  }

  getPuntos(){
    return this.puntos;
  }

  play(){
    this.player.body.setEnable(true);
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
        this.player.setVelocityX(-jugabilidad.player.movimientoX);
        this.player.setAngle(-10);

        if(!this.impulsado) {
            this.impulsado = true;
            this.player.setVelocityY(-jugabilidad.player.impulso);
        }
    }

    if (this.derecha) {
        this.player.setVelocityX(jugabilidad.player.movimientoX);
        this.player.setAngle(10);

        if(!this.impulsado) {
            this.impulsado = true;
            this.player.setVelocityY(-jugabilidad.player.impulso);
        }
    }

    if (this.subir) {
        this.subir = false;
        this.derecha = false;
        this.izquierda = false;

        this.player.setVelocityX(0);
        this.player.setAngle(0);

        this.player.setVelocityY(-jugabilidad.player.impulso);
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
