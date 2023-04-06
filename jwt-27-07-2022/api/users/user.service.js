const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(
            `INSERT INTO registration (firstname,lastname, email,gender,password,number) VALUES(?,?,?,?,?,?)`,
            [data.firstname, data.lastname, data.email, data.gender, data.password, data.number],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        )
    },
    getUser: (callback) => {
        pool.query(`SELECT id,firstname,lastname,email,gender,password from registration`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },
    getUserById: (id, callback) => {
        pool.query(`SELECT id, firstname, lastname, email, gender, password, number from registration where id =?`,
            [id],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        pool.query(`UPDATE registration set firstname=?, lastname=?, email=?, gender=?,password=?, number=? where id = ?`,
            [
                data.firstname,
                data.lastname,
                data.email,
                data.gender,
                data.password,
                data.number,
                data.id
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        )
    },
    deleteUser: (data, callback) => {
        pool.query(`delete from registration where id=?`,
            [data.id],
            (err, results, fields) => {
                console.log(results[0]+" deleted")
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        )
    },
    getUserByEmail: (email, callback) => {
        pool.query(`SELECT * FROM registration where email = ?`,
            [email],
            (err, result, fields) => {
                if (err) return callback(err);
                return callback(null, result[0]);
            }
        )
    }


};