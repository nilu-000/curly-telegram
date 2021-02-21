const {Pool} = require('pg');


const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "newer",
    password: "password",
    port: 5432
});

async function fetch(query, ...params){
    const client = await pool.connect();

    try {
        return await client.query(query, params.length ? params: null);
    } catch (err) {
        throw new Error("DATABASE: " + err)
    } finally {
        await client.release();
    }
}

module.exports = fetch;