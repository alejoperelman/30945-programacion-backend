const express = require('express');
const { Router } = express;
const cartsRouter = Router();

const { Carritos } = require('../models/Carritos');
const { Productos } = require('../models/Productos');

let carritosContainer = new Carritos();
let productosContainer = new Productos();

cartsRouter.get('/', async function (req, res) {
    let carts = await carritosContainer.getAll();
    res.json({carritos: carts});
});

cartsRouter.get('/:id/productos', async function (req, res) {
    let carrito = await carritosContainer.getById(req.params.id);
    res.json({productos: carrito});
});

cartsRouter.post('/', async function (req, res) {
    let cart = req.body;
    let newCart = null;
    if (cart && cart.fecha) {
        newCart = await carritosContainer.save(cart.productos);
        res.json({result: 'Carro Guardado', carrito: newCart});
    } else {
        res.json({result: 'Complete los datos'});
    }
});

cartsRouter.post('/:id/productos', async function(req, res) {
    let cartId = req.params.id;
    let prod = await productosContainer.getById(req.params.id);

    if (cartId && prod) {
        let cart = await carritosContainer.addProdToCart(cartId, prod);
        res.json({result: 'Producto agregado al carrito', cart: cart});
    } else {
        res.json({result: 'Producto no agregado'});
    }
});

//cartsRouter.get('/:id/productos', (req, res) => {
//    let carrito = carritosContainer.getProdById(req.body.id);
//    res.json({productos: carrito});
//});


module.exports = cartsRouter;