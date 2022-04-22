
const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const express = require('express');

const PORT = 8080;

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { Contenedor } = require('./data/contenedor')
let contenedor = new Contenedor('./data/productos.json') 
let productos = contenedor.cargoArreglo();

const { Mensajes } = require('./data/mensajes')
let mensajes = new Mensajes('./data/mensajes.json') 
let mensajesTodos = mensajes.cargoArreglo();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');  
 })

app.use(express.static('./public'));

//PRODUCTOS

app.get('/productos', function (req, res) {
    res.render('pages/productList', { listaProductos: productos }); 
})

app.post('/productos', (req, res) =>  {
const newObj = {
    title: req.body.titulo,
    price: parseFloat(req.body.precio),
    thumbnail: req.body.url
}   
    let producto = contenedor.postProduct(newObj,productos);
    res.render('pages/productList', { listaProductos: productos }); 
}) 

//CHATS
app.get('/chat', function (req, res) {
    //res.sendFile('/public/index.html', { root: __dirname })
    res.render('pages/chat'); //, { listaProductos: productos } 
})

const server = app.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`);
    console.log("Aplicacion express escuchando en http://localhost:8080 ") //  + server.address().port);
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.emit('messages', mensajesTodos);

    socket.on('new-message', data => {
        mensajesTodos.push(data);
        io.sockets.emit('messages', mensajesTodos);
    })
})