//const { knexMysql } = require('../options/mariaDB');

class Productos {
    // constructor() {
    //      //this.getProducts(knexMysql);
    //  }

        getProducts(knex){
            return knex('productos').select('idProd', 'nombre', 'precio', 'foto')
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
            });
        }
        
        addProducts(knex, newObj) {
            return knex('productos').insert(newObj)
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        }

}

module.exports = {Productos}