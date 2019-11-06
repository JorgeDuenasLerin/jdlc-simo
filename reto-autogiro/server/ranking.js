var fs = require('fs');

FILE_NAME = "./server/ranking.txt";
FIELD_SEPARATOR = "*;*"

class Ranking  {
  constructor() {
    this.ranking = []
  }

  read() {
    this.ranking = [];
    var fileContents = fs.readFileSync(FILE_NAME);

    var lines = fileContents.toString().split('\n');

    var rnk = this.ranking;

    lines.map(function(d){
      if(data != ''){
        var data = d.split(FIELD_SEPARATOR);
        if(data.length!=2) return;
        rnk.push(
          {
            nombre: data[0],
            puntos: data[1]
          }
        );
      }
    });

    console.log(this.ranking);
  }

  get10(){
    return this.ranking.slice(0,10);
  }

  add(nombre, puntos) {
    this.ranking.push({
      nombre: nombre,
      puntos: puntos
    });
    this.ranking.sort(function(a,b){
      return b.puntos - a.puntos;
    });
  }

  write() {
    var data = "";
    this.ranking.map(function(ob){
      data += ob.nombre + FIELD_SEPARATOR + ob.puntos + "\n";
    });

    fs.writeFile(FILE_NAME, data, (err) => {
      if (err){
          console.log('ERRORE EN LA ESCRITURA DEL RANKING!');
      }
      console.log('The file has been saved!');
    });
  }
}

module.exports = Ranking;
