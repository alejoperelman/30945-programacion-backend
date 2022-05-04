const { Container } = require('./Container');

class Productos extends Container {
    constructor() {
        super('./src/data/productos.json');
        let productos = this.getAll();
        this.id = (productos.length > 0) ? productos.length + 1 : 1;
    }

        save(nombre, descripcion, codigo, precio, stock, fecha, img) {
            let productos = this.getAll();
            let producto = {id:this.id, nombre: nombre, descripcion: descripcion, codigo: codigo, precio: precio, stock: stock, fecha: fecha, img: img}
            productos.push(producto);
            this.saveInFile(productos);
            this.id++;
        }

        update(id, nombre, descripcion, codigo, precio, stock, fecha, img) {
            let productos = this.getAll();
            //let productos = {id:this.id, nombre: nombre, descripcion: descripcion, codigo: codigo, precio: precio, stock: stock, fecha: fecha, img: img}
            let productosUpdate = productos.map(producto => {
                if (producto.id === id) {
                return {
                        nombre: producto.nombre,
                        descripcion:producto.descripcion,
                        codigo:producto.codigo,
                        precio:producto.precio,
                        stock:producto.stock,
                        fecha:producto.fecha,
                        img:producto.img
                    }
                }
            });
            console.log (productosUpdate);
            this.saveInFile(productosUpdate);
        }

       getAll() {
            let productos = this.getContentFile();
            return productos;
        }

        getById(id) {
            let productos = this.getAll();
            let producto = null;
            if(productos.length > 0) {
                let element = productos.find(elem => elem.id == id);
                if(element) {
                    producto = element;
                }
            }
            return producto;
        }

        deleteById(id) {
            let productos = this.getAll();
            let producto = null;
            if(productos.length > 0) {
                let elements = productos.filter(elem => elem.id !== id);
                if(elements) {
                    producto = true;
                    this.saveInFile(elements);
                }
            }
            return producto;
        }
}

module.exports = {Productos}
