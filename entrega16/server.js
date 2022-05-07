const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const express = require('express');
const PORT = 8080;
const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { knexMysql } = require('./options/mariaDB');
const { Productos } = require('./models/Productos');
let contenedor = new Productos();

const { Mensajes } = require('./models/Mensajes');
const { knexSqLite } = require('./options/sqlLite3');
let msgAll = new Mensajes();

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views")

app.get('/', function (req, res) {
    res.render('pages/index');  
})

app.use(express.static('./public'));

//PRODUCTOS

app.get('/productos', async function (req, res) {
    let productos = await contenedor.getProducts(knexMysql);
    res.render('pages/productList', { listaProductos: productos }); 
})

app.post('/productos', async function(req, res) {
const newObj = {
    nombre: req.body.titulo,
    precio: parseFloat(req.body.precio),
    foto: req.body.url
}   
    let newProd = await contenedor.addProducts(knexMysql,newObj);
    let productos = await contenedor.getProducts(knexMysql);
    res.render('pages/productList', { listaProductos: productos }); 
}) 

//CHATS
app.get('/chat', async function (req, res) {
    let mensajes = await msgAll.getMsg(knexSqLite);
    res.render('pages/chat', { messages: mensajes });
})

httpServer.listen(8080, () => {
    console.log('SERVER ON en http://localhost:8080');
});

io.on('connection', async function(socket) {
    console.log('Cliente conectado:');
    let mensajes = await msgAll.getMsg(knexSqLite);
    socket.emit('messages', mensajes);

    socket.on('new-message', async function(data) {
        let guardado = await msgAll.postMsg(knexSqLite, data);
        io.sockets.emit('messages', guardado);
    })
})