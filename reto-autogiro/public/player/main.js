var otro = document.getElementById('losiento');
var manda = document.getElementById('manda-juego');
var juega = document.getElementById('juega');
var code = document.getElementById('code');
var displayId = document.getElementById('id');

var id = -1;

function clearUI(){
  manda.style.display = "none";
  juega.style.display = "none";
  losiento.style.display = "none";
}

clearUI();
losiento.style.display = "initial";

var socket = io.connect('http://localhost:18080', { 'forceNew': true });

socket.on('introcodigo', function(data) {
  clearUI();
  manda.style.display = "initial";
});

socket.on('id', function(data) {
  id = data;
  displayId.innerHTML = id;
});

socket.on('juegas', function(data) {
  clearUI();
  juega.style.display = "initial";
});

socket.on('nojuegas', function(data) {
  clearUI();
  losiento.style.display = "initial";
});

function enviaCodigo() {
  socket.emit('intentojugar', {
    'id': id,
    'code': code.value
  });
}

function enviaComando(comando) {
  socket.emit(comando, {
    'id': id
  });
}
