const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const { schema, normalize, denormalize } = require('normalizr') 
const util = require('util')
const express = require('express');
const PORT = 8080;
const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity("text");
const postSchema = new schema.Entity("post", {
author: authorSchema,
text: messageSchema
})

const { MensajesMdb } = require('./models/MensajesMongoDb');
let msgAll = new MensajesMdb();

const { ProductosFaker } = require('./models/ProductosFaker');
let fakeProducts = new ProductosFaker;

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views")

app.get('/', function (req, res) {
    res.render('pages/index');  
})

app.use(express.static('./public'));

//PRODUCTOS

app.get('/productos-test', async function (req, res) {
    const prodFake = await fakeProducts.getProductsFake();
    res.render('pages/productListFake', { listaProductos: prodFake }); 
})

//CHATS
app.get('/chat', async function (req, res) {
    let mensajes = await msgAll.getAll();
    console.log(mensajes);
    res.render('pages/chat', { messages: mensajes });
})

httpServer.listen(8080, () => {
    console.log('SERVER ON en http://localhost:8080');
});

io.on('connection', async function(socket) {
    console.log('Cliente conectado Socket');
    let normalizrMsg = { id: 1, post:[]};
    let mensajes = await msgAll.getAll();
    normalizrMsg.post.push(mensajes)
    console.log(normalizrMsg)
    const normalizedMsg = normalize(normalizrMsg, postSchema)
    console.log(util.inspect(normalizedMsg, false, 12, true));
    console.log("-------------");
    socket.emit('messages', mensajes);

    socket.on('new-message', async function(data) {
        let guardado = await msgAll.postMsg(data);
        io.sockets.emit('messages', guardado);
    })
})