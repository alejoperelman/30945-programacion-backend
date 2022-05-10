const express = require('express');
const { Router } = express;
const productsRouter = Router();

const { Productos } = require('../models/Productos');

let productosContainer = new Productos();

productsRouter.get('/', async function(req, res) {
    let productos = await productosContainer.getAll();
    res.json({productos: productos});
});

productsRouter.get('/:id', async function (req, res) {
    let producto = await productosContainer.getById(req.params.id);
    res.json({producto: producto});
})

productsRouter.post('/', async function(req, res) {
    let producto = req.body;
    console.log(req.body)
    if (producto && producto.nombre && producto.precio && producto.codigo) {
        producto = await productosContainer.save(producto.nombre, producto.descripcion, producto.codigo, producto.precio, producto.stock, Date(), producto.img);
        res.json({result: 'Producto Guardado', producto: producto});
    } else {
        res.json({result: 'Complete los datos'});
    }
});

productsRouter.put('/:id', async function(req, res) {
        //const producto = await productosContainer.getById(req.params.id);
        let productoBody = req.body;
        if (productoBody && productoBody.nombre && productoBody.precio && productoBody.codigo) {
            let productoUpdate = await productosContainer.update(productoBody.id ,productoBody.nombre, productoBody.descripcion, productoBody.codigo, productoBody.precio, productoBody.stock, productoBody.fecha, productoBody.img);
            res.json({result: 'Producto Guardado', producto: productoUpdate});
        } else {
            res.json({result: 'Complete los datos'});
        }
});

productsRouter.delete('/:id', async function(req, res) {
    let producto = await productosContainer.deleteById(req.params.id);
    if (producto) {
        res.json({result: 'Producto Eliminado'});
    } else {
        res.json({result: 'No se encontro el producto', producto: producto});
    }
})

module.exports = productsRouter;