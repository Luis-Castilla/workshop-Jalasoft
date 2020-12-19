/**Variables de entorno */
var env = require('node-env-file'); // .env file

console.log(__dirname);

env(__dirname + '/./.env');


/**PostgreSQL */
const pg = require('pg');
const pool = new pg.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASEPORT
});

/**
 * Consulta de solo lectura (GET Y DELETE)
 * @param q Consulta  
 */
exports.query_read = async function(q) {
    let client = await pool.connect();
    let res;
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q);
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res;
}


/**
 * Consulta de escritura (POST, PUT Y PATCH)
 * @param q Consulta  
 * @param params Parametros de la consulta
 */
exports.query_write = async function(q, params) {
    let client = await pool.connect();
    let res;
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q, params)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res;
}