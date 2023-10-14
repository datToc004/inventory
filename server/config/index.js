const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.USERS,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});


module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end(),
};
