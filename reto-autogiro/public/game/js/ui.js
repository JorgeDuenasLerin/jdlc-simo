
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

    this.codeText = this.scene.add.text(200, 500, this.getTextCode('XXXX', 0), { fontSize: '32px', fill: '#000' });
    this.codeText.setDepth(1000);
    this.codeText.setVisible(false);
    this.codeText.setActive(false);

    var testRanking = "Jugador: 0 puntos\nJugador: 0 puntos\nJugador: 0 puntos\nJugador: 0 puntos\n";
    this.rankingText = this.scene.add.text(500, 50, testRanking , { fontSize: '24px', fill: '#FFF' });
    this.rankingText.setDepth(1000);
    this.rankingText.setVisible(false);
    this.rankingText.setActive(false);
  }

  showPresentacion(code, count) {
    // Mostrar presentación y esperar jugador
    this.presentacion.setVisible(true);
    this.presentacion.setActive(true);

    this.codeText.setText(this.getTextCode(code, count));
    this.codeText.setVisible(true);
    this.codeText.setActive(true);
  }

  actualizaPresentacion(code, count){
    this.codeText.setText(this.getTextCode(code, count));
  }

  hidePresentation() {
    this.presentacion.setVisible(false);
    this.presentacion.setActive(false);
    this.codeText.setVisible(false);
    this.codeText.setActive(false);
    this.rankingText.setVisible(false);
    this.rankingText.setActive(false);
  }

  showRanking(ranking) {
    this.rankingText.setText(ranking[0].nombre + ' - ' + ranking[0].puntos);
    this.rankingText.setVisible(true);
    this.rankingText.setActive(true);
  }

  getTextCode (code, count){
    return 'Introduce el código:' + code + '\n' + count + 'ts';
  }
}
