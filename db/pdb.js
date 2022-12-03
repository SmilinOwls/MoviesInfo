const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = {
    host: '127.0.0.1',
    port: 5432,
    database: 'pg_movie',
    user: 'postgres',
    password: '123',
    max: 30
};

const db = pgp(cn);


exports.load = (queryParam,value) => {
    return new Promise((resolve, reject) => {
        db.query(queryParam,value)
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
} 