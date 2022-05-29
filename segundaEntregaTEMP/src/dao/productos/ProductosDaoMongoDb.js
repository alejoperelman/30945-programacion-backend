const ContainerMongoDb = require('../../contenedores/ContainerMongoDb');
const URIMDB = 'mongodb+srv://dbAdmin:Qy3k2xeRFQ4jBze@apibackend.hutlo.mongodb.net/ecommerce?retryWrites=true&w=majority';
const modelo = require('../../models/productos');

class ProductosDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(modelo);
        this.modelo = modelo;
        // let productos = this.getAll();
    }
        // async save(nombre, descripcion, codigo, precio, stock, fecha, img) {
        //     let productos = await this.getAll();
        //     let sortedArray = productos.sort((a, b)=> a.id - b.id);
        //     let lastItem = sortedArray[sortedArray.length -1].id;
        //     let lastId = parseInt(lastItem) + 1;
        //     let producto = {id: lastId, nombre: nombre, descripcion: descripcion, codigo: codigo, precio: precio, stock: stock, fecha: fecha, img: img}
        //     productos.push(producto);
        //     await this.saveInFile(productos);
        // }

        // async update(id, nombre, descripcion, codigo, precio, stock, fecha, img) {
        //     let deleteProduct = await this.deleteById(id);
        //     let producto = {id: id, nombre: nombre, descripcion: descripcion, codigo: codigo, precio: precio, stock: stock, fecha: fecha, img: img}
        //     let productos = await this.getAll();
        //     productos.push(producto);
        //     let sortedArray = productos.sort((a, b)=> a.id - b.id);
        //     await this.saveInFile(sortedArray);
        // }

        // async getAll() {
        //     let productos = await this.getContentDb();
        //     return productos;
        // }

        // async getById(id) {
        //     let productos = await this.getAll();
        //     let producto = null;
        //     if(productos.length > 0) {
        //         let element = productos.find(elem => elem.id == id);
        //         if(element) {
        //             producto = element;
        //         }
        //     }
        //     return producto;
        // }

        // async deleteById(id) {
        //     let productos = await this.getAll();
        //     if(productos.length > 0) {
        //         let elements = productos.filter((elem) => elem.id != id);
        //         if(elements) {
        //             await this.saveInFile(elements);
        //         }
        //     }
        //     return productos;
        // }
}

module.exports = {ProductosDaoMongoDb} ;