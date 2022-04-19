const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { Contenedor } = require('./data/contenedor')
let contenedor = new Contenedor('./data/productos.json') 
let productos = contenedor.cargoArreglo();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');    
})

app.get('/productos', function (req, res) {
    res.render('main', { listaProductos: productos }); 
})

app.post('/productos', (req, res) =>  {
     
const newObj = {
    title: req.body.titulo,
    price: parseFloat(req.body.precio),
    thumbnail: req.body.url
}   
    let producto = contenedor.postProduct(newObj,productos);
    res.render('main', { listaProductos: productos }); 
}) 


const server = app.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`);
    console.log("Aplicacion express escuchando en el puerto " + server.address().port);
});