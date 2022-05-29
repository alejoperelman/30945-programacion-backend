const ContainerFirebase = require('../../contenedores/ContainerFirebase');

class ProductosDaoFirebase extends ContainerFirebase {
    constructor() {
        super('productos');
        let productos = this.getAll();
    }
}

module.exports = {ProductosDaoFirebase};