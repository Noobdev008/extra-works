const { Pool } = require('pg');

// const pool = new Pool({
//     host: process.env.HOST,
//     port: process.env.PORT,
//     user: process.env.user,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

const dbConnection = cb => {
    try {
        const pool = new Pool({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.user,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
    
        if (!pool) {
            throw new Error('Pool not connected');
        }

        return cb({error: false, db: pool});
    } catch (err) {
        return cb({error: true, message: err.message, db: null});
    }
    
}

// (async() => {
//     const pool = new Pool({
//         host: process.env.HOST,
//         port: process.env.PORT,
//         user: process.env.user,
//         password: process.env.PASSWORD,
//         database: process.env.DATABASE
//     });

//     if (!pool) {
//         cb({error: true, db: pool});
//     }
//     dbObject = {error: false, query: (text, params) => {
//         return pool.query(text, params);
//     }}
// })();

module.exports = dbConnection;
