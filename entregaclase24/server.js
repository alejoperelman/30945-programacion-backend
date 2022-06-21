const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const express = require('express');
const session = require('express-session')

const PORT = 8080;
const URIMDB = 'mongodb+srv://dbAdmin:Qy3k2xeRFQ4jBze@apibackend.hutlo.mongodb.net/ecommerce?retryWrites=true&w=majority';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { MensajesMdb } = require('./models/MensajesMongoDb');
let msgAll = new MensajesMdb();

const { ProductosFaker } = require('./models/ProductosFaker');
let fakeProducts = new ProductosFaker;

const { UsuariosMongoDb } = require('./models/UsuariosMongoDb');
let usuariosContainer = new UsuariosMongoDb;

//const productsRouter = require('./routes/ProductosRoutes');

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views")

app.get('/', function (req, res) {
    res.render('pages/inicio');  
})

app.use(express.static('./public'));

app.use(session({
    store: MongoStore.create({ mongoUrl: URIMDB}),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxage: 36000
    }
}))

app.use(cookieParser("coderhouse"))

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//AUTH
//localhost:8080/login?username=aperez@iramundi.com&password=123456 ADMIN
//localhost:8080/login?username=coderhouse@coderhouse.com&password=coderhouse2022 STANDAR

app.get('/login', async (req, res) => {
    const { username, password } = req.query
    console.log(req.query)
    if(username && password ) {
        const usuario = await usuariosContainer.getUserByEmail(username);
        console.log(usuario)
            if( usuario.password == password && usuario.admin == true) {
                req.session.user = username;
                req.session.admin = true;
                req.session.logged = true;
                console.log("Es Admin y ta Logueado")
                res.render('pages/index', { usuario: username }); 
            }else{
                if(password === usuario.password) {
                    req.session.user = username;
                    req.session.logged = true;
                    console.log("Ta Logueado")
                    res.render('pages/index', { usuario: username }); 
                }else{
                    return res.send('Usuario o contraseña incorrecto')
                }
            }
    }else {
        return res.send('Complete los datos')
    }
})

app.get('/logout',checkLogged, (req, res) => {
    const username = req.session.user;
    req.session.destroy( error => {
        if (error) {
            res.send({status: 'Logout Error', body: error})
        }
    })
    res.render('pages/logout', { usuario: username }); 
})

//PRODUCTOS FAKE
app.get('/productos-test',checkLogged, async function (req, res) {
    const prodFake = await fakeProducts.getProductsFake();
    res.render('pages/productListFake', { listaProductos: prodFake }); 
})

//CHATS
app.get('/chat', checkLogged, async function (req, res) {
    let mensajes = await msgAll.getAll();
    console.log(mensajes);
    res.render('pages/chat', { messages: mensajes });
})

// app.use('/api/productos', productsRouter);

function checkAuth(req, res, next) {
    console.log(req.session?.admin)
    if(req.session?.admin) {
        return next();
    }
    return res.status(401).send('Usted no tiene permisos')
}

function checkLogged(req, res, next) {
    console.log(req.session?.logged)
    if(req.session?.logged) {
        return next();
    }
    return res.status(401).send('Usted no tiene permisos')
}


httpServer.listen(8080, () => {
    console.log('SERVER ON en http://localhost:8080');
});

io.on('connection', async function(socket) {
    console.log('Cliente conectado Socket');
//    let normalizrMsg = { id: 1, post:[]};
    let mensajes = await msgAll.getAll();
//    normalizrMsg.post.push(mensajes)
//    console.log(normalizrMsg)
//    const normalizedMsg = normalize(normalizrMsg, postSchema)/
//    console.log(util.inspect(normalizedMsg, false, 12, true));
//    console.log("-------------");
    socket.emit('messages', mensajes);

    socket.on('new-message', async function(data) {
        let guardado = await msgAll.postMsg(data);
        io.sockets.emit('messages', guardado);
    })
})