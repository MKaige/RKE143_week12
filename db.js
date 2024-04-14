const { Pool } = require ('pg');
const itemsPool = new Pool({
    user: 'postgres',
    password: 'Minupar00l.1234',
    host: 'localhost',
    port: 5432,
    database: 'myrecipes'
});

module.exports = itemsPool;