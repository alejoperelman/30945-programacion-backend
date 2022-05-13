# Entrega 18

## Creacion Database

use ecommerce

## Creacion de Collections

db.createCollection("productos")
db.createCollection("mensajes")

## Agregar 10 documentos
###  Productos

db.productos.insertMany([
   {
      nombre: "iPad Air 10",
      descripcion: "iPad Air 10 - Ultimo Modelo",
      precio: 120,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35678",
      fecha: ISODate()
    },
    {
      nombre: "PC Gaming",
      descripcion: "PD 16GB, SSD 1TB, GFX, i7",
      precio: 900,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35679",
      fecha: ISODate()
    },
    {
      nombre: "PC Oficina",
      descripcion: "8GB, 128 SSD, i5",
      precio: 580,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35680",
      fecha: ISODate()
    },
    {
      nombre: "Notebook Dell",
      descripcion: "Inspiron 4GB, 1TB, i5",
      precio: 1280,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35681",
      fecha: ISODate()
    },
    {
      nombre: "Notebook HP",
      descripcion: "Modelo Elite -  8GB, 512SSD, i5",
      precio: 1700,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35682",
      fecha: ISODate()
    },
    {
      nombre: "Notebook Alienware",
      descripcion: "Modelo XTR1 -  8GB, 512SSD, i7",
      precio: 2300,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35683",
      fecha: ISODate()
    },
    {
      nombre: "Windows 11",
      descripcion: "El Nuevo Sistema Operativo de Microsoft",
      precio: 2860,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35684",
      fecha: ISODate()
    },
    {
      nombre: "Windows Server 2022",
      descripcion: "El Nuevo Sistema Operativo de Microsoft, Para Servidor",
      precio: 2860,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35692",
      fecha: ISODate()
    },
    {
      nombre: "Servidor MicroServer HPE",
      descripcion: "Servidor ultracompacto",
      precio: 3350,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35795",
      fecha: ISODate()
    },
    {
      nombre: "Servidor ThinkSystem ST50",
      descripcion: "Servidor Toware basica, compacta y accesible",
      precio: 4320,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35792",
      fecha: ISODate()
    },

])

### Mensajes

db.mensajes.insertMany([
   {
      email: "cliente@isp.com",
      mensaje: "Hola Tienen un producto especial?",
      fecha: ISODate()
    },
   {
      email: "hola@ecommerce.com",
      mensaje: "No vendemos nada especial",
      fecha: ISODate()
    },
   {
      email: "cliente2@isp.com",
      mensaje: "Hola Quisiera saber si el equipo Lenovo vuela?",
      fecha: ISODate()
    },
   {
      email: "hola@ecommerce.com",
      mensaje: "No de momento, pero tiene planes",
      fecha: ISODate()
    },
   {
      email: "cliente3@isp.com",
      mensaje: "Hola, esa ranura que tiene el equipo es para poder pagar con la tarjeta de credito?",
      fecha: ISODate()
    },
   {
      email: "hola@ecommerce.com",
      mensaje: "No, es la disketera",
      fecha: ISODate()
    },
   {
      email: "cliente4@isp.com",
      mensaje: "Con procesador i15 tienen el mismo producto?",
      fecha: ISODate()
    },
   {
      email: "hola@ecommerce.com",
      mensaje: "Lamentablemente no, :-(",
      fecha: ISODate()
    },
   {
      email: "cliente5@isp.com",
      mensaje: "El PC que compre es una proqueria",
      fecha: ISODate()
    },
   {
      email: "hola@ecommerce.com",
      mensaje: "Si es verdad",
      fecha: ISODate()
    }

])

## Listar Productos Ingresados

db.productos.find()

## Listar Mensajes Ingresados

db.mensajes.find()

## Contar los Productos Ingresados

db.productos.count() 

## Contar los Mensajes Ingresados

db.mensajes.count() 

## Insertar un Producto

db.use ecommerce
	db.productos.insertOne(
   {
      nombre: "iPhone 13",
      descripcion: "iPhone 13, ultimo telefono inteligente de Apple",
      precio: 2120,
      foto: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/ipad-512.png",
      codigo: "SKU35678",
      fecha: ISODate()
    })

## Listar Productos con precios menor a $1000

	db.productos.find({"precio": {$lt: 1000}})

## Listar Productos con precios entre $1000 y $3000

	db.productos.find({ $and: [{ "precio": {$gte: 1000}}, {"precio": {$lte: 3000}} ]})

## Listar Productos con precios mayores a $3000

	 db.productos.find({"precio": {$gt: 3000}})

## Listar Nombre del 3er producto mas barato

  db.productos.find({},{nombre:1, _id:0}).sort({precio: 1}).skip(2).limit(1)

## Agregar un campo Stock con valor de 100 a todos los productos

  db.productos.updateMany({}, [{ $set: { stock: 100 } }])  

## Cambiar Stock a 0 en Productos con valor mayor a $4000

  db.productos.updateMany({precio: {$gt:4000}}, [{ $set: { stock: 0 } }])

## Borrar todos los productos con valor menor a $1000

  db.productos.deleteMany( {precio: {$lt:1000}} )

## Crear usuario "pepe" con passwd "asd456" y que no pueda escribir

  db.createUser({user: "pepe",pwd: "asd456",roles: [{ role: "read", db: "ecommerce" }]})

