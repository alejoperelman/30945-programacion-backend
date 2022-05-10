const { Container } = require('./Container');

class Carritos extends Container{
    constructor() {
            super('./src/data/carritos.json');
            let carts = this.getAll();
            this.id = (carts.length > 0) ? carts.length + 1 : 1;
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

        async save(productos) {
            let carritos = await this.getAll();
            let diaCart = Date();
            this.id++;
            let carrito = {id:this.id, fecha: diaCart, productos: productos}
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
                }
                this.saveInFile(carro);
            }
                return carro;
        }

        async getProdById(id){
            let carrito = await this.getById(id);
            if(carrito.length > 0) {
                return carrito.productos;
            }
        }
}

module.exports = {Carritos}
