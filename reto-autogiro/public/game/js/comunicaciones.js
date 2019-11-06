const PORT = 30000;
const URL = 'localhost';
// const URL = 'simo.iesjuandelacierva.es';

class Comunicaciones  {
  constructor() {
    this.orquestador = new Orquestador();
    this.player = new Player();
  }

  connect(){
    var player = this.player;
    this.socket = io.connect('http://' + + ':' + PORT, { 'forceNew': true });

    this.socket.on('entrajugador', function(data) {
      console.log('¡¡Comienza el juego!!');
      orquestador.setArranqueJuego();
    });

    this.socket.on('juegonuevo', function(ranking) {
      orquestador.setJuegoNuevo(ranking);
    });

    this.socket.on('izquierda', function(data) {
      player.setIzquierda();
    });

    this.socket.on('subir', function(data) {
      player.setSubir();
    });

    this.socket.on('derecha', function(data) {
      player.setDerecha();
    });
  }

  pedirJugadores(code) {
    this.socket.emit('pidejugadores', code);
  }

  enviaPuntos(puntos) {
    this.socket.emit('gameover', puntos);
  }
}
