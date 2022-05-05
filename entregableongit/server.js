
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
const { Productos } = require('./models/Productos')
let contenedor = new Productos() 
let productos = contenedor.getProducts(knexMysql);

const { Mensajes } = require('./models/Mensajes')
let mensajes = new Mensajes('./data/mensajes.json') 
let msgAll = mensajes.cargoArreglo();

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views")

app.get('/', function (req, res) {
    res.render('pages/index');  
 })

app.use(express.static('./public'));

//PRODUCTOS

app.get('/productos', function (req, res) {

    // let productos = contenedor.getProducts(knexMysql);
    console.log(productos);
    //console.log(JSON.stringify({productos: productos}));
    //res.render('pages/productList', { listaProductos: productos }); 
    //res.render('Hola');
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
    res.render('pages/chat', { messages: msgAll });
})

httpServer.listen(8080, () => {
    console.log('SERVER ON en http://localhost:8080');
});

io.on('connection', (socket) => {
    console.log('Cliente conectado:' + JSON.stringify(msgAll));
    socket.emit('messages', JSON.stringify(msgAll));

    socket.on('new-message', data => {
        msgAll.push(data);
        io.sockets.emit('messages', JSON.stringify(msgAll));
        let guardado = mensajes.postMsg(msgAll);
    })
})