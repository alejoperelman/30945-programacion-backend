const { Container } = require('./Container');

class Carritos extends Container{
    constructor() {
            super('./src/data/carritos.json');
            //let carts = this.getAll();
            //this.id = (carts.length > 0) ? carts.length + 1 : 1;
        }
        
        async getAll() {
            let carritos = await this.getContentFile();
            return carritos;
        }

        async getById(id) {
            let carritos = await this.getAll();            
            let cart = null;
            if(carritos.length > 0) {
                let element = carritos.filter(elem => elem.id == parseInt(id));
                if(element) {
                    cart = element;
                }
            }
            return cart;
        }

        async save() {
            let carritos = await this.getAll();
            let diaCart = Date();
            let productos = [];
            let sortedArray = carritos.sort((a, b)=> a.id - b.id);
            let lastItem = sortedArray[sortedArray.length -1].id;
            let lastId = parseInt(lastItem) + 1;
            let carrito = {id:lastId, fecha: diaCart, productos: productos}
            carritos.push(carrito);
            this.saveInFile(carritos);
        }

        async addProdToCart(cartId, producto) {
            let carritos = await this.getAll();
            let carro = null;
                if(carritos.length > 0) {
                    let element = carritos.find(elem => elem.id == cartId);
                        if(element) {
                            element.productos.push(producto);
                            carro = element;
                            let delCarrito = await this.deleteById(cartId)
                            carritos.push(carro);
                            console.log(JSON.stringify(carritos));
                            let sortedArray = carritos.sort((a, b)=> a.id - b.id);
                            this.saveInFile(carritos);
                        }

                }
                return carro;
        }

        async getProdById(id){
            let carrito = await this.getById(id);
            if(carrito.length > 0) {
                return carrito.productos;
            }
        }

        async deleteById(id) {
            let carts = await this.getAll();
            if(carts.length > 0) {
                let elements = carts.filter((elem) => elem.id != id);
                if(elements) {
                    await this.saveInFile(elements);
                }
            }
            return carts;
        }
}

module.exports = {Carritos}
