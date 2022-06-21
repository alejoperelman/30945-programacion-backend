const ContainerMongoDb = require('./ContainerMongoDb');
const mongoose = require('mongoose');
const usuariosCollection = 'usuarios';

const UsuariosSchema = new mongoose.Schema({
    email: {type: String, required: true, max: 100},
    nombre: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    apellido: {type: String, required: true, max: 200},
    admin: {type: Boolean, required: true}
})

class UsuariosMongoDb extends ContainerMongoDb {
  constructor() {
     super(usuariosCollection,UsuariosSchema);
     let usuarios = this.getAll();
  }

  async getUserByEmail(mail){
    console.log('Read One: ' + mail);
    let usr = await this.modelo.findOne({email: mail});
    if (usr) {
      return usr
    }else {
      return false
    }
  }
}

module.exports = { UsuariosMongoDb }