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
            // let sortedArray = productos.sort((a, b)=> a.id - b.id);
            // let lastItem = sortedArray[sortedArray.length -1].id;
            // let lastId = parseInt(lastItem);
            // newProd["id"] = ++lastId;
            // sortedArray.push(newProd);
            // try {
            //     fs.promises.writeFile('./data/mensajes.json', JSON.stringify({productos: sortedArray}))
            //     console.log("Nuevo Mensaje Posteado" );
            // }
            // catch (err){
            //     console.log("Error de Lectura!", err);
            // }
            // return newProd;
        }
}

module.exports = {Mensajes}
