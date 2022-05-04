const express = require('express');
const { Router } = express;
const productsRouter = Router();

const { Productos } = require('../models/Productos');

let productosContainer = new Productos();

productsRouter.get('/', (req, res) => {
    let productos = productosContainer.getAll();
    res.json({productos: productos});
});

productsRouter.get('/:id', (req, res) => {
    let producto = productosContainer.getById(req.params.id);
    res.json({producto: producto});
})

productsRouter.put('/:id', (req, res) => {
    const productoDB = productosContainer.getById(req.params.id);
    console.log(productoDB.length);
    console.log(req.params.id);
        let productoBody = req.body;
        if (productoBody && productoBody.nombre && productoBody.precio && productoBody.codigo) {
            let productoUpdate = productosContainer.update(productoBody.id ,productoBody.nombre, productoBody.descripcion, productoBody.codigo, productoBody.precio, productoBody.stock, productoBody.fecha, productoBody.img);
            res.json({result: 'Producto Guardado', producto: productoUpdate});
        } else {
            res.json({result: 'Complete los datos'});
        }
});

productsRouter.post('/', (req, res) => {
    let producto = req.body;
    if (producto && producto.nombre && producto.precio && producto.codigo) {
        producto = productosContainer.save(producto.nombre, producto.descripcion, producto.codigo, producto.precio, producto.stock, producto.fecha, producto.img);
        res.json({result: 'Producto Guardado', producto: producto});
    } else {
        res.json({result: 'Complete los datos'});
    }
});

productsRouter.delete('/:id', (req, res) => {
    let producto = productosContainer.deleteById(req.params.id);
    console.log(producto)
    if (producto) {
        res.json({result: 'Producto Eliminado'});
    } else {
        res.json({result: 'No se encontro el producto', producto: producto});
    }
})

module.exports = productsRouter;
