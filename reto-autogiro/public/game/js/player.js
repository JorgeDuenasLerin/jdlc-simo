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
    this.player.setPosition(100,100);
  }

  play(){
    this.player.body.setEnable(true);
  }

  setIzquierda() {
    this.izquierda = true;
    console.log(this.izquierda);
  }

  setSubir() {
    this.subir = true;
  }

  setDerecha() {
    this.derecha = true;
  }

  update(){
    this.life--;
    if(this.life == 0) {
      this.orquestador.setFinJuego();
    }

    if (this.izquierda)
    {
      this.izquierda = false; 
      this.player.setVelocityX(-10);        
    }

    if (this.subir)
    {
        this.subir = false;
        this.player.setVelocityY(-jugabilidad.player.impulso);
    }

    if (this.derecha)
    {
        this.derecha = false;
        this.player.setVelocityX(10);
    }

    /*
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
    }*/
  }
}
