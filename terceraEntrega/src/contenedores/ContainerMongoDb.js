const mongoose = require('mongoose');
const URIMDB = 'mongodb+srv://dbAdmin:Qy3k2xeRFQ4jBze@apibackend.hutlo.mongodb.net/ecommerce?retryWrites=true&w=majority';
//const modelProd = require('../../models/productos');
let ObjectId = require("mongodb").ObjectId

class ContainerMongoDb {
  constructor(colleccion, Squema) {
    mongoose.connect(URIMDB, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Connected'))
    this.modelo = mongoose.model(colleccion, Squema);
  }

  async getAll(){
    return await this.modelo.find({});
  }

  async getById(id){
    console.log('Read One');
    let prod = await this.modelo.find({_id: id});
    console.log(prod);
    return prod
  }

  async save(item){
    console.log('Save');
    const saveModel = new this.modelo(item);
    let newItem = await saveModel.save();
    console.log(newItem);
    return newItem
  }


  //Este no se porque no guarda los cambios que envio en JSON, no modifica mi idea es que modifique todo
  async update(id, item) {
    console.log('Update One');
    const updateModel = new this.modelo();
    let prodUpdate = await updateModel.updateOne(
      { _id: ObjectId(id)},
      {$set: item }
    );
    return item
  }

  //Este no se porque no elimina el elemento como que no lo borra
  async delete(id) {
    console.log('Delete');
    const deleteModel = new this.modelo();
    let prodDelete = await deleteModel.deleteOne({_id: ObjectId(id)});
    console.log(prodDelete);
  }
}

module.exports = ContainerMongoDb;