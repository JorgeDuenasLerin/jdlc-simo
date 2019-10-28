var socket = io.connect('http://localhost:8080/player', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  //render(data);
})

function addMessage(e) {

  socket.emit('new-message', 'Info a enviar: subir');
  return false;
}
