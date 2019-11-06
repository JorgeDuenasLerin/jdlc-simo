
class UI  {
  constructor(scene = "") {
      if (!!UI.instance) {
          return UI.instance;
      }

      UI.instance = this;

      this.scene = scene;
      this.orquestador = new Orquestador(scene);
      this.player = new Player(scene);

      this.presentacion = "";

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


    var rect = new Phaser.Geom.Rectangle(180, 450, 530, 300);
    this.codeBack = this.scene.add.graphics({fillStyle: { color: 0xFFFFFF,  alpha: 0.9 }});
    this.codeBack.fillRectShape(rect);
    this.codeText = this.scene.add.text(200, 460, this.getTextCode('XXXX', 0), { fontFamily: 'LevelUP', fontSize: '23px', fill: '#000' });
    this.codeText.setDepth(1000);
    this.codeText.setVisible(false);
    this.codeText.setActive(false);


    var rect = new Phaser.Geom.Rectangle(500, 50, 300, 380);
    this.rankingBack = this.scene.add.graphics({ fillStyle: { color: 0x0A0AF0,  alpha: 0.6 } });
    this.rankingBack.fillRectShape(rect);

    var testRanking = "Jugador: 0 puntos\nJugador: 0 puntos\nJugador: 0 puntos\nJugador: 0 puntos\n";
    this.rankingText = this.scene.add.text(580, 60, testRanking , { fontFamily: 'LevelUP', fontSize: '26px', fill: '#FFF' });
    this.rankingText.setDepth(1000);
    this.rankingText.setVisible(false);
    this.rankingText.setActive(false);

    var rect = new Phaser.Geom.Rectangle(10, 10, 160, 30);
    this.puntosBack = this.scene.add.graphics({ fillStyle: { color: 0xFFFFFF,  alpha: 1 } });
    this.puntosBack.fillRectShape(rect);
    this.puntosText = this.scene.add.text(15, 10, "Puntos", { fontFamily: 'LevelUP', fontSize: '24px', fill: '#00F' });
    this.puntosText.setDepth(1100);
    this.puntosText.setActive(true);
    this.puntosBack.setVisible(true);
    this.puntosText.setVisible(true);

    this.puntosActualesText = this.scene.add.text(105, 11, "0", { fontFamily: 'LevelUP', fontSize: '24px', fill: '#F0F' });
  }

  showPresentacion(code, count) {
    // Mostrar presentación y esperar jugador
    this.presentacion.setVisible(true);
    this.presentacion.setActive(true);

    this.codeText.setText(this.getTextCode(code, count));
    this.codeText.setVisible(true);
    this.codeBack.setVisible(true);
    this.codeText.setActive(true);
    this.rankingBack.setVisible(true);

  }

  actualizaPresentacion(code, count){
    this.codeText.setText(this.getTextCode(code, count));
  }

  actualizaPuntos(){
    this.puntosActualesText.setText(this.player.getPuntos());
  }

  hidePresentation() {
    this.presentacion.setVisible(false);
    this.presentacion.setActive(false);
    this.codeText.setVisible(false);
    this.codeBack.setVisible(false);
    this.codeText.setActive(false);
    this.rankingText.setVisible(false);
    this.rankingText.setActive(false);
    this.rankingBack.setVisible(false);
  }

  showRanking(ranking) {
    var ranking_text = "Clasificación\n\n";
    var i = 1;
    ranking.map(function(e){
      ranking_text += i++ + 'º ' + e.nombre + ' (' + e.puntos + ')\n';
    });
    this.rankingText.setText(ranking_text);
    this.rankingText.setVisible(true);
    this.rankingText.setActive(true);
    this.rankingBack.setVisible(true);
  }

  getTextCode (code, count){
    var txt = "Para jugar, visita:\n";
    txt += "http://simo . iesjuandelacierva . es\n\n";
    txt += 'Introduce el código: ' + code + '\n';
    txt += 'Cambio de código en ' + count + 'ms';
    return txt;
  }
}
