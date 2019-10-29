const ESTADOS = {
  ARRANCANDO:       '0',
  PIDE_JUGAOR:      '5',
  PIDIENDO_JUGADOR: '10',
  ARRANQUE_JUEGO:   '15', // Establecido cuando llega el mensaje
  JUGANDO:          '20',
  FIN_JUEGO:        '90',
};

const PIDE_JUGADOR_RESET = 500;

class Orquestador  {

  constructor(scene = "") {
      if (!!Orquestador.instance) {
          return Orquestador.instance;
      }

      Orquestador.instance = this;

      this.scene = scene;
      this.presentacion = "";
      this.estado = ESTADOS.ARRANCANDO;
      this.player = new Player(scene);

      return this;
  }

  preload(){
    this.scene.load.image('presentacion', 'assets/presentacion.png');
  }

  create(){
    this.presentacion = this.scene.add.image(400, 300, 'presentacion');
    this.presentacion.setDepth(1000);
    this.presentacion.setVisible(false);
    this.presentacion.setActive(false);

    this.code = 'XXXX';
    this.codeText = this.scene.add.text(200, 500, this.getTextCode(), { fontSize: '32px', fill: '#000' });
    this.codeText.setDepth(1000);
    this.codeText.setVisible(false);
    this.codeText.setActive(false);
  }

  nuevoJuego(){
    this.count = PIDE_JUGADOR_RESET;

    this.code = Math.floor(1000 + Math.random() * 9000);

    // Mostrar presentación y esperar jugador
    this.presentacion.setVisible(true);
    this.presentacion.setActive(true);

    this.codeText.setText(this.getTextCode());
    this.codeText.setVisible(true);
    this.codeText.setActive(true);

    // Comunicaciones pide nuevo jugador
    this.comm.pedirJugadores(this.code);
  }

  comienzoJuego(){
    // Llega nuevo jugador
    // resetear puntuación y comenzar juego
    this.presentacion.setVisible(false);
    this.presentacion.setActive(false);
    this.codeText.setVisible(false);
    this.codeText.setActive(false);
    this.player.reset();
    this.player.play();
  }

  finJuego(){
    // Muerto finalizar juego
  }

  update(){
    if(this.estado == ESTADOS.PIDIENDO_JUGADOR) {
      this.count--;
      this.codeText.setText(this.getTextCode());
      if(this.count == 0){
        this.nuevoJuego();
      }
    }

    if(this.estado == ESTADOS.ARRANQUE_JUEGO) {
      this.comienzoJuego();
      this.estado = ESTADOS.JUGANDO;
    }

    if(this.estado == ESTADOS.ARRANCANDO || this.estado == ESTADOS.PIDE_JUGADOR) {
      this.nuevoJuego();
      this.estado = ESTADOS.PIDIENDO_JUGADOR;
    }

    if(this.estado == ESTADOS.FIN_JUEGO) {
      this.nuevoJuego();
      this.estado = ESTADOS.PIDIENDO_JUGADOR;
    }
  }

  getTextCode (){
    return 'Introduce el código:' + this.code + '\n' + this.count + 'ts';
  }

  setArranqueJuego(){
    this.estado = ESTADOS.ARRANQUE_JUEGO;
  }

  setFinJuego(){
    this.estado = ESTADOS.FIN_JUEGO;
  }

  setPlayer(player){
    this.player = player;
  }

  setComunicaciones(comm){
    this.comm = comm;
  }
}
