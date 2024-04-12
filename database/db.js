const Pool = require('pg').Pool;
require("dotenv").config

const dbConfig = {
    user: process.env.PG_User,
    password: process.env.PG_Password,
    host: process.env.PG_Host,
    database: process.env.PG_Database,
    port: process.env.PG_Port,
}

const pool = new Pool(dbConfig);

module.exports = pool;
