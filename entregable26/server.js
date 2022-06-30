const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const express = require('express');
const session = require('express-session')

const PORT = 8080;
const URIMDB = 'mongodb+srv://dbAdmin:Qy3k2xeRFQ4jBze@apibackend.hutlo.mongodb.net/ecommerce?retryWrites=true&w=majority';
const app = express();

const { TIEMPO_EXPIRACION } = require('./config/globals')
const {validatePass} = require('./utils/passValidator');
const {createHash} = require('./utils/hashGenerator')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes/AuthRoutes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { MensajesMdb } = require('./models/MensajesMongoDb');
let msgAll = new MensajesMdb();

const { ProductosFaker } = require('./models/ProductosFaker');
let fakeProducts = new ProductosFaker;

//const { UsuariosMongoDb } = require('./models/UsuariosMongoDb');
let usuariosContainer = require('./models/UsuariosMongoDb');

//const productsRouter = require('./routes/ProductosRoutes');

app.use(express.static('./public'));

app.use(session({
    store: MongoStore.create({ mongoUrl: URIMDB}),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxage: TIEMPO_EXPIRACION
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser("coderhouse"))

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views")

passport.use('login', new LocalStrategy(
    (username, password, callback) => {
        usuariosContainer.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }

            if (!user) {
                console.log('No se encontro usuario');
                return callback(null, false)
            }

            if(!validatePass(user, password)) {
                console.log('Invalid Password');
                return callback(null, false)
            }

            return callback(null, user)
        })
    }
))

passport.use('signup', new LocalStrategy(
    {passReqToCallback: true}, (req, username, password, callback) => {
        usuariosContainer.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('Hay un error al registrarse');
                return callback(err)
            }

            if (user) {
                console.log('El usuario ya existe');
                return callback(null, false)
            }

            console.log(req.body);
            const newUser = {
                nombre: req.body.nombre,
                apellido:  req.body.apellido,
                username:  username,
                password: createHash(password),
                admin:req.body.isadmin
            }

            console.log(newUser);

            usuariosContainer.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Hay un error al registrarse');
                    return callback(err)
                }

                console.log(userWithId);
                console.log('Registro de usuario satisfactoria');

                return callback(null, userWithId)
            })
        })
    }
))

passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    usuariosContainer.findById(id, callback)
})

//  INDEX
app.get('/', routes.getRoot);

//  LOGIN
app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
app.get('/faillogin', routes.getFaillogin);

//  SIGNUP
app.get('/signup', routes.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

//  LOGOUT
app.get('/logout', routes.getLogout);

// PROFILE
app.get('/profile', routes.getProfile);

app.get('/ruta-protegida', routes.checkAuthentication, (req, res) => {
    res.render('protected')
});

//  FAIL ROUTE
app.get('*', routes.failRoute);

//PRODUCTOS FAKE

// app.get('/productos-test',checkAuthentication, async function (req, res) {
//     const prodFake = await fakeProducts.getProductsFake();
//     res.render('pages/productListFake', { listaProductos: prodFake }); 
// })

//CHATS

// app.get('/chat', checkAuthentication, async function (req, res) {
//     let mensajes = await msgAll.getAll();
//     console.log(mensajes);
//     res.render('pages/chat', { messages: mensajes });
// })

// app.use('/api/productos', productsRouter);

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