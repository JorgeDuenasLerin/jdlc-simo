let id = -1;

const URL = 'localhost';
// const URL = 'simo.iesjuandelacierva.es';

const socket = io.connect('http://' + URL + ':18080', { 'forceNew': true });

const btnEnviar = document.getElementById('enviar');
const btnControles = document.getElementById('control');

btnEnviar.addEventListener('click', enviarCodigo);
btnControles.addEventListener('click', enviarComando);
document.getElementById("codigo")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      btnEnviar.click();
    }
});


var otro = document.getElementById('losiento');
var manda = document.getElementById('manda-juego');
var juega = document.getElementById('juega');
var displayId = document.getElementById('id');

clearUI();
losiento.style.display = "initial";


function clearUI(){
  manda.style.display = "none";
  juega.style.display = "none";
  losiento.style.display = "none";
}

socket.on('introcodigo', function(data) {
  clearUI();
  manda.style.display = "flex";
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

socket.on('damenombre', function(data) {
  clearUI();
  juega.style.display = "initial";
});

function enviarCodigo(evt) {
  // TODO: No depender de HTML
  var nombre = document.getElementsByName('nombre')[0].value;
  var codigo = document.getElementsByName('codigo')[0].value;
  socket.emit('intentojugar', {
    'id': id,
    'code': codigo,
    'nombre': nombre
  });
}

function enviarComando(evt) {
  if(evt.target.tagName !== 'BUTTON') return;

  socket.emit('comando', {
    comando: evt.target.id,
    'id': id
  });
}
