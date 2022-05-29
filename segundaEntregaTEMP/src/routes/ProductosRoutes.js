const express = require('express');
const { Router } = express;
const productsRouter = Router();

// //ARCHIVO//
// const { Productos } = require('../dao/productos/ProductosDaoArchivo');
// let productosContainer = new Productos();
// //******************************/

//MONGODB//
const { ProductosDaoMongoDb } = require('../dao/productos/ProductosDaoMongoDb');
const productosContainer = new ProductosDaoMongoDb();
//******************************//

// //FIREBASE//
// const { ProductosDaoFirebase } = require('../dao/productos/ProductosDaoFirebase');
// const productosContainer = new ProductosDaoFirebase();
// //**********************************************//

productsRouter.get('/', async function(req, res) {
    let productos = await productosContainer.getAll();
    console.log(productos);
    res.json({productos: productos});
});

productsRouter.get('/:id', async function (req, res) {
    let producto = await productosContainer.getById(req.params.id);
    res.json({producto: producto});
})

productsRouter.post('/', async function(req, res) {
    let producto = req.body;
    console.log(req.body)
    if (producto.nombre && producto.precio && producto.codigo) {
        producto = await productosContainer.save(producto);
        res.json({result: 'Producto Guardado', producto: producto});
    } else {
        res.json({result: 'Complete los datos'});
    }
});

productsRouter.put('/:id', async function(req, res) {
        let producto = req.body;
        if (producto.nombre && producto.precio && producto.codigo) {
            let productoUpdate = await productosContainer.update(req.params.id ,producto);
            console.log(producto)
            res.json({result: 'Producto Guardado', producto: productoUpdate});
        } else {
            console.log(producto)
            res.json({result: 'Complete los datos'});
        }
});

productsRouter.delete('/:id', async function(req, res) {
    let producto = await productosContainer.delete(req.params.id);
    if (producto) {
        res.json({result: 'Producto Eliminado'});
    } else {
        res.json({result: 'No se encontro el producto', producto: producto});
    }
})

module.exports = productsRouter;