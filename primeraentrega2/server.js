const express = require('express');
const app = express();

const productsRouter = require('./src/routes/ProductosRoutes');
const cartRouter = require('./src/routes/CarritosRoutes');

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

const server = app.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`);
    console.log("Aplicacion express escuchando en el puerto " + server.address().port);
});