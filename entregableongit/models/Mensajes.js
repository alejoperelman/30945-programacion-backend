const fs = require('fs');

class Mensajes {
    constructor(email, mensaje, fecha) {
        this.email = email
        this.mensaje = mensaje
        this.fecha = fecha
        }
        
        cargoArreglo () {
            try {
                let data = fs.readFileSync('./data/mensajes.json', 'utf-8')
                let arreglo = JSON.parse(data).mensajes;
                return arreglo;
            }
            catch (err){
                console.log("Error de Lectura!", err);
                return null;
            }
        }

        postMsg(newMsg) {
            try {
                fs.promises.writeFile('./data/mensajes.json', JSON.stringify({mensajes: newMsg}))
                console.log("Nuevo Mensaje Posteado" );
                return newMsg;
            }
            catch (err){
                console.log("Error de Lectura!", err);
                return false;
            }
        }
}

module.exports = {Mensajes}
