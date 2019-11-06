const ANCHO_EDIFICIO = 117;
const NUMERO_EDIFICIOS = 100;
const VELOCIDAD_EDIFICIOS = 2;

class Edificio {
  constructor(scene){

    this.scene = scene;
    this.wallGroup = null;
    this.grupoEdificios = null;
    this.velocidadEdificio = 300;
    this.count = 0;
    return this;
}

preload() {
    this.scene.load.image('edificio_peq', 'assets/edificio_peq.png'); //,  { frameWidth: 128, frameHeight: 128 });
    this.scene.load.image('edificio_med', 'assets/edificio_med.png'); //, { frameWidth: 128, frameHeight: 128 });
    this.scene.load.image('edificio_grande', 'assets/edificio_grande.png');
}

create(){
  
    this.grupoEdificios = this.scene.physics.add.group({
        defaultKey: 'edificio',
        immovable: true,
        allowGravity:false
    });

    this.grupoEdificios.enableBody = true;

    let posX = game.config.width + 5;
    for (var i = 0; i < NUMERO_EDIFICIOS; i++) {
        var edificio = null;

        let valor = Phaser.Math.Between(0, 10)
        if (valor <= 4) {
            edificio = this.scene.add.image(posX, game.config.height - 122 / 2, 'edificio_peq');
        } else if (valor <= 8) {
            edificio = this.scene.add.image(posX, game.config.height - 220 / 2, 'edificio_med');
        } else {
            edificio = this.scene.add.image(posX, game.config.height - 323 / 2, 'edificio_grande');
        }
        posX += ANCHO_EDIFICIO;
        edificio.ox = edificio.x;
        this.grupoEdificios.add(edificio);
    } 

}

update(){

    Phaser.Actions.IncX(this.grupoEdificios.getChildren(), -VELOCIDAD_EDIFICIOS);

    this.count++;
    if (this.count == Math.round(ANCHO_EDIFICIO * (NUMERO_EDIFICIOS + 7) / VELOCIDAD_EDIFICIOS)) {
        this.count = 0;
        this.grupoEdificios.children.iterate(function(child) {
            child.x = child.ox;
        }.bind(this));
    } 
}
}