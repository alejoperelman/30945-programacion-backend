const { Container } = require('./Container');

class Productos extends Container {
    constructor() {
        super('./src/data/productos.json');
        // let productos = this.getAll();
        // this.id = (productos.length > 0) ? productos.length + 1 : 1;
    }

        async save(nombre, descripcion, codigo, precio, stock, fecha, img) {
            let productos = await this.getAll();
            let sortedArray = productos.sort((a, b)=> a.id - b.id);
            let lastItem = sortedArray[sortedArray.length -1].id;
            let lastId = parseInt(lastItem) + 1;
            let producto = {id: lastId, nombre: nombre, descripcion: descripcion, codigo: codigo, precio: precio, stock: stock, fecha: fecha, img: img}
            productos.push(producto);
            await this.saveInFile(productos);
        }

        async update(id, nombre, descripcion, codigo, precio, stock, fecha, img) {
            let deleteProduct = await this.deleteById(id);
            let producto = {id: id, nombre: nombre, descripcion: descripcion, codigo: codigo, precio: precio, stock: stock, fecha: fecha, img: img}
            let productos = await this.getAll();
            productos.push(producto);
            await this.saveInFile(productos);
        }

        async getAll() {
            let productos = await this.getContentFile();
            return productos;
        }

        async getById(id) {
            let productos = await this.getAll();
            let producto = null;
            if(productos.length > 0) {
                let element = productos.find(elem => elem.id == id);
                if(element) {
                    producto = element;
                }
            }
            return producto;
        }

        async deleteById(id) {
            let productos = await this.getAll();
            if(productos.length > 0) {
                let elements = productos.filter((elem) => elem.id != id);
                if(elements) {
                    await this.saveInFile(JSON.stringify(elements));
                }
            }
            return productos;
        }
}

module.exports = {Productos}
