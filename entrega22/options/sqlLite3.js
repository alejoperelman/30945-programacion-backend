const knexSqLite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data/ecommerce.sqlite'
    },
    useNullAsDefault: true
})

module.exports = { knexSqLite };