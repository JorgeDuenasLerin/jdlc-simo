var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var ioPrincipal;

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

var clienteJuego;
var clientes = {};

var id = 0;
var lookup = {};

var secreto = 2413;

app.use(express.static('public'));

app.get('/hello', function(req, res) {
  res.status(200).send("Hola mundo!");
});
/*
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

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});
