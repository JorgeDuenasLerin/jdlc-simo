const PORT = 30000;

class Comunicaciones  {
  constructor() {
    this.orquestador = new Orquestador();
    this.player = new Player();
  }

  connect(){
    var player = this.player;
    this.socket = io.connect('http://localhost:' + PORT, { 'forceNew': true });

    this.socket.on('entrajugador', function(data) {
        console.log('Comienza juego!!');
        orquestador.setArranqueJuego();
    });

    this.socket.on('subir', function(data) {
      player.setSubir();
    });
  }

  pedirJugadores(code) {
    this.socket.emit('pidejugadores', code);
  }
}
