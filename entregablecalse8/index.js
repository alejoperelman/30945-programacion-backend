const express = require('express');
const  { Router } = express;
const multer = require('multer');



const { Contenedor } = require('./data/contenedor')
let contenedor = new Contenedor('./data/productos.json') 
let productos = contenedor.cargoArreglo();

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 8080;

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/static/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());  
    }
})

let upload = multer({storage: storage});

router.get('/productos', (req, resp) =>  { 
    resp.json({productos: productos}); 
}) 


router.get('/', (req, resp) =>  { 
    resp.send("http://localhost:8080/public/index.html"); 
}) 



router.get('/productos/:id', (req, resp) => {
    let producto = contenedor.getById(req.params.id, productos);
    if (producto.length >= 1) {   
        resp.json({producto: producto}); 
    }else {
        resp.send("El Producto no existe");   
    }
})

router.post('/productos', (req, resp) =>  { 
    let producto = contenedor.postProduct({title: 'iPad Pro',price: 1150, thumbnail: './img/ipadpro.jpg'},productos);
    resp.json({producto: producto}); 
}) 

router.put('/productos/:id', (req, resp) => {
    let producto = contenedor.getById(req.params.id, productos);
    if (producto.length >= 1) {
        resp.json({
            producto: req.body
        });
    }else {
        resp.send("El Producto no existe");   
    }
})

router.delete('/productos/:id', (req, resp) =>  {
    let producto = contenedor.getById(req.params.id, productos);
    if (producto.length >= 1) { 
        let newProductos = contenedor.deleteById(req.params.id, productos);
        resp.json({productos: newProductos});
    }else {
        resp.send("El Producto no existe");   
    }
}) 

app.post('/public/static/img', upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    if(!file) {
        const error = new Error('Cargue un Archivo');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
})


app.use('/api', router);

const server = app.listen(PORT, () => { 
    console.log("Aplicacion express escuchando en el puerto 8080");
})


