let id = -1;

const URL = 'localhost';
// const URL = 'simo.iesjuandelacierva.es';

const socket = io.connect('http://' + URL + ':18080', { 'forceNew': true });

const btnEnviar = document.getElementById('enviar');
const btnControles = document.querySelectorAll('#control button');

btnEnviar.addEventListener('click', enviarCodigo);

btnControles[0].addEventListener('click', evt => enviarComando(evt, btnControles[0].id));
btnControles[1].addEventListener('click', evt => enviarComando(evt, btnControles[1].id));
btnControles[2].addEventListener('click', evt => enviarComando(evt, btnControles[2].id));

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
  console.log('introcodigo');
  clearUI();
  manda.style.display = "flex";
});

socket.on('id', function(data) {
  console.log('id');
  id = data;
  displayId.innerHTML = id;
});

socket.on('juegas', function(data) {
  console.log('juegas');
  clearUI();
  juega.style.display = "initial";
});

socket.on('nojuegas', function(data) {
  console.log('nojuegas');
  clearUI();
  losiento.style.display = "initial";
});

socket.on('damenombre', function(data) {
  console.log('damenombre');
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

function enviarComando(evt, id) {
  socket.emit('comando', {
    comando: id,
    'id': id
  });
}
