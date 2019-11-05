var express = require('express');

var appJuego = express();
var serverJuego = require('http').Server(appJuego);
var ioJuego = require('socket.io')(serverJuego);

var appJugadores = express();
var serverJugadores = require('http').Server(appJugadores);
var ioJugadores = require('socket.io')(serverJugadores);

appJuego.use(express.static('public/game'));
appJugadores.use(express.static('public/player'));


var ioPrincipal;
var code;

ioJuego.on('connection', function(socket) {
  console.log('JUEGO: conectado!!');
  ioPrincipal = socket;
  socket.on('pidejugadores', function(data) {
    console.log('Código de reto:' + data);
    code = data;

    ioJugadores.sockets.emit('introcodigo', '');
    console.log('Pide código a jugadores');
  });

  socket.on('gameover', function(data) {
    console.log('Conseguidos puntos:' + data);
    console.log(nombre);
    console.log('fin partida');

    ioPrincipal.emit('juegonuevo', [ {nombre: nombre, puntos: data} ]);
  });

  ioPrincipal.emit('juegonuevo', [
    {'p1':1}, {'p2':2}
  ]);
});

serverJuego.listen(30000, function() {
  console.log("JUEGO: Servidor corriendo en http://localhost:30000");
});


var jugadorActual;
var nombre;

ioJugadores.on('connection', function(socket) {

  console.log('JUGADORES: conectado!! ' + socket.id);

  socket.emit('id', socket.id);

  socket.on('intentojugar', function(data) {
    console.log('JUGADORES => Recibido intento\nid:' + data.id + '\ncode: ' + data.code + '\nnombre: ' + data.nombre);
    if(data.code == code) {
      code = -1;
      console.log('JUGADORES => id:' + data.id + ' entra a jugar!!!');
      ioJugadores.sockets.emit('nojuegas');
      socket.emit('juegas');
      jugadorActual = socket;
      nombre = data.nombre;
      ioPrincipal.emit('entrajugador');
    }
  });

  socket.on('comando', function(data) {
    // TODO: VErificar id
    console.log(data);
    ioPrincipal.emit(data.comando);
  });
});

serverJugadores.listen(18080, function() {
  console.log("JUGADORES: Servidor corriendo en http://localhost:18080");
});

/*


io
  .of('/principal')
  .on('connection', function(socket) {
    console.log('Juego conectado');
    ioPrincipal = socket;
  });

io
  .of('/player')
  .on('connection', function(socket) {
    console.log('Juego conectado: cliente');
    socket.on('new-message', function(data) {
      console.log(data);
      ioPrincipal.send('algo');
      //io.sockets.emit('messages', messages);
    });
  });

/*
adminSocket.on('connection', function(socket) {

  /*
  socket.on('juego-principal', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });

  socket.on('new-message', function(data) {
    adminSocket.send('algo');


    //io.sockets.emit('messages', messages);
  });

});
*/
/*
var clienteJuego;
var clientes = {};

var id = 0;
var lookup = {};

var secreto = 2413;



app.get('/hello', function(req, res) {
  res.status(200).send("Hola mundo!");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  /*
  socket.on('juego-principal', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });

  socket.on('new-message', function(data) {
    adminSocket.send('algo');


    //io.sockets.emit('messages', messages);
  });

});
*/
/*
io.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    // the disconnection was initiated by the server, you need to reconnect manually
    io.connect();
  }
  // else the socket will automatically try to reconnect
  console.log('Alguien se ha DESconectado');
});

io.on('connect_timeout', (timeout) => {
  // ...
  console.log('Alguien se ha DESconectado');
});
*/
