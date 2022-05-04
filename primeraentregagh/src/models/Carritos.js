const { Container } = require('./Container');

class Carritos extends Container{
    constructor() {
            super('./src/data/carritos.json');
            let carts = this.getAll();
            this.id = (carts.length > 0) ? carts.length + 1 : 1;
        }
        
        getAll() {
            let carritos = this.getContentFile();
            return carritos;
        }

        getById(id) {
            let carritos = this.getAll();
            let cart = null;
            if(carritos.length > 0) {
                let element = carritos.find(elem => elem.id == id);
                if(element) {
                    cart = element;
                }
            }
            return cart;
        }

        save(productos) {
            let carritos = this.getAll();
            let diaCart = Date();
            let carrito = {id:this.id, fecha: diaCart, productos: productos}
            carritos.push(carrito);
            this.saveInFile(carritos);
            this.id++;
        }

        addProdToCart(cartId, producto) {
            let carritos = this.getAll();
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

        getProdById(id){
            let carrito = this.getById(id);
            if(carrito.length > 0) {
                return carrito.productos;
            }
        }

}

module.exports = {Carritos}
