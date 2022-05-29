const mongoose = require("mongoose");
const productosCollection = 'productos';

const ProductosSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 200},
    precio: {type: Number, required: true},
    foto: {type: String, required: false, max: 100},
    codigo: {type: String, required: true},
    fecha: {type: Date, default: Date.now, required: true}
});

//const productos = mongoose.model(productosCollection, ProductosSchema)

module.export =  mongoose.model(productosCollection, ProductosSchema);
//productos
