const { knexMysql } = require('../options/mariaDB');

class Productos {
    constructor() {
        //this.getProducts(knexMysql);
        }

        getProducts = (knex) => {
            knex('productos').select('idProd', 'nombre', 'precio', 'foto')
            .then((result) => {
                console.log(result);
                return result;
            }).catch((err) => {
                console.log(err);
            });
        }


}

module.exports = {Productos}