const knexMysql = require('knex')({
    client: 'mysql',
    connection: {
        host: '192.168.1.22',
        port : 3306,
        user: 'adminer',
        password: '******',
        database: 'ecommerce'
    },
    pool: {min: 0, max: 10}
})

module.exports = { knexMysql };