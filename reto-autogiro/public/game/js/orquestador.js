const ESTADOS = {
  ARRANCANDO:       '0',  // Estado inicial. Esperamos al mensaje juego nuevo
  JUEGO_NUEVO:      '5',
  PIDIENDO_JUGADOR: '10',
  ARRANQUE_JUEGO:   '15', // Establecido cuando llega el mensaje de jugador
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
      this.estado = ESTADOS.ARRANCANDO;
      this.player = new Player(scene);
      this.ui = new UI(scene);

      this.code = 'XX';
      this.ranking = [];

      return this;
  }

  preload(){

  }

  create(){
    this.code = 'XX';
  }

  nuevoJuego(){
    this.count = PIDE_JUGADOR_RESET;

    this.code = Math.floor(10 + Math.random() * 90);

    this.ui.showPresentacion(this.code, this.count);
    this.ui.showRanking(this.ranking);

    // Comunicaciones pide nuevo jugador
    this.comm.pedirJugadores(this.code);
  }

  comienzoJuego(){
    // Llega nuevo jugador
    // resetear puntuación y comenzar juego
    this.ui.hidePresentation();
    this.player.reset();
    this.player.play();
  }

  finJuego(){
    // Muerto finalizar juego
  }

  update(){

    if(this.estado == ESTADOS.ARRANCANDO) {
      // Esperamos mensaje de juego nuevo
    }

    if(this.estado == ESTADOS.JUEGO_NUEVO) {
      this.nuevoJuego();
      this.estado = ESTADOS.PIDIENDO_JUGADOR;
    }

    if(this.estado == ESTADOS.PIDIENDO_JUGADOR) {
      this.count--;
      this.ui.actualizaPresentacion(this.code, this.count);

      if(this.count == 0){
        this.nuevoJuego();
      }
    }

    if(this.estado == ESTADOS.ARRANQUE_JUEGO) {
      this.comienzoJuego();
      this.estado = ESTADOS.JUGANDO;
    }

    if(this.estado == ESTADOS.FIN_JUEGO) {
      this.estado = ESTADOS.ARRANCANDO;
      this.comm.enviaPuntos(this.player.getPuntos());
      /*
      this.nuevoJuego();
      this.estado = ESTADOS.PIDIENDO_JUGADOR;
      */
    }
  }

  setArranqueJuego(){
    this.estado = ESTADOS.ARRANQUE_JUEGO;
  }

  setJuegoNuevo(ranking){
    this.ranking = ranking;
    this.estado = ESTADOS.JUEGO_NUEVO;
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
