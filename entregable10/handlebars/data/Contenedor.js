const fs = require('fs');

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Contenedor {
    constructor(id,titulo, precio, img) {
        this.id = id
        this.title = titulo
        this.price = precio
        this.thumbnail = img
        }
        
        cargoArreglo () {
            console.log('Metodo getAll()');
            try {
                //getAll(): Object - Retorna Array completo.
                let data = fs.readFileSync('./data/productos.json', 'utf-8')
                let arreglo = JSON.parse(data).productos;
                return arreglo;
            }
            catch (err){
                console.log("Error de Lectura!", err);
                return null;
            }
        }

        postProduct(newProd, productos) {
            let sortedArray = productos.sort((a, b)=> a.id - b.id);
            let lastItem = sortedArray[sortedArray.length -1].id;
            let lastId = parseInt(lastItem);
            newProd["id"] = ++lastId;
            sortedArray.push(newProd);
            return newProd;
        }

        getById(id, arreglo) {
            //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
            console.log('Metodo getById(id)');
            const result = arreglo.filter(obj => obj.id == id);
            return result;
        }

}

module.exports = {Contenedor}
