const mongoose = require('mongoose');
const URIMDB = 'mongodb+srv://dbAdmin:Qy3k2xeRFQ4jBze@apibackend.hutlo.mongodb.net/ecommerce?retryWrites=true&w=majority';

class ContainerMongoDb {
  constructor(model) {
    mongoose.connect(URIMDB, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Connected'))
    
    this.model = model;
  }
 
  async getAll(){
    console.log(this.model)
    return await this.model.find();
  }
}

module.exports = ContainerMongoDb;