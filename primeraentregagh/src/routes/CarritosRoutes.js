const express = require('express');
const { Router } = express;
const cartsRouter = Router();

const { Carritos } = require('../models/Carritos');
const { Productos } = require('../models/Productos');

let carritosContainer = new Carritos();
let productosContainer = new Productos();

cartsRouter.get('/', (req, res) => {
    let carts = carritosContainer.getAll();
    res.json({carritos: carts});
});

cartsRouter.get('/:id/productos', (req, res) => {
    let carrito = carritosContainer.getProdById(req.body.id);
    res.json({productos: carrito});
});

cartsRouter.post('/', (req, res) => {
    let cart = req.body;
    let newCart = null;
    if (cart && cart.fecha) {
        newCart = carritosContainer.save(cart.productos);
        res.json({result: 'Carro Guardado', carrito: newCart});
    } else {
        res.json({result: 'Complete los datos'});
    }
});

cartsRouter.post('/:id/productos', (req, res) => {
    let cartId = req.params.id;
    let prod = productosContainer.getById(req.body.id);

    if (cartId && prod) {
        let cart = carritosContainer.addProdToCart(cartId, prod);
        res.json({result: 'Producto agregado al carrito', cart: cart});
    } else {
        res.json({result: 'Producto no agregado'});
    }
});

module.exports = cartsRouter;