
const pool = require('.././config/db.config')
// const postModel = require('./post.model')
// console.log(pool + " pool");


module.exports = {
    create: (data, callback) => {
        pool.query(
            `INSERT INTO user(Name,Email,JWT) VALUES (?,?,?)`,
            [data.Name, data.Email, data.JWT],
            (err, res) => {
                // console.log(res);
                if (err) {
                    return callback(err, null);
                }
                else {
                    pool.query(
                        `INSERT INTO auth(Password,Email,UserID) VALUES (?,?,?)`,
                        [data.Password, data.Email, res.insertId],
                        (err, res) => {
                            // console.log(res);
                            if (err) {
                                return callback(err, null);
                            }
                            return callback(null, res);
                        }
                    )
                }
            }
        )

    },
    createAdmin: (data, callback) => {
        pool.query(
            `INSERT INTO user(Name,Email,UserType,JWT) VALUES (?,?,?,?)`,
            [data.Name, data.Email, data.UserType, data.JWT],
            (err, res) => {
                // console.log(res);
                if (err) {
                    return callback(err, null);
                }
                else {
                    pool.query(
                        `INSERT INTO auth(Password,Email, UserID) VALUES (?,?,?)`,
                        [data.Password, data.Email, res.insertId],
                        (err, res) => {
                            if (err) {
                                return callback(err, null);
                            }
                            return callback(null, res);
                        }
                    )
                }
            }
        )

    },
    getUser: (callback) => {
        pool.query(`SELECT * from user inner join auth on user.ID = auth.UserID`,
            [],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },
    getUserById: (id, callback) => {
        pool.query(`SELECT * from user inner join auth on user.ID = auth.userID where auth.id =?`,
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
        // let oldEmail;
        // pool.query(`SELECT * FROM user where id = ${data.id}`, (err, results) => {
        //     oldEmail = results[0].Email;
        // })
        // console.log(data + " data");
        pool.query(`UPDATE User set Name=?,Email=? where ID = ?`,
            [
                data.Name,
                data.Email,
                data.ID
            ],
            (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    // console.log(data.Password);
                    pool.query(`UPDATE Auth set Password =? where UserID = ?`,

                        [
                            data.Password,
                            data.ID
                        ],
                        // console.log(data),
                        (err, results) => {
                            if (err) {
                                callback(err, null);
                            }
                            callback(null, data);
                            console.log(data + " after query");
                        }
                    )
                }
            }
        )

    },
    deleteUser: (data, callback) => {
        pool.query(`delete from user where id=?`,
            [data.id],
            (err, results) => {
                // console.log(results + " deleted")
                if (err) {
                    return callback(err);
                }
                pool.query(`delete from auth where id=?`,
                    [data.id],
                    (err, results) => {
                        console.log(results[0] + " deleted")
                        if (err) {
                            return callback(err);
                        }
                        return callback(null, results);
                    }
                )
            }
        )
    },
    getUserByEmail: (email, callback) => {
        pool.query(`SELECT * FROM user where Email = ?`, [email],
            (err, result, fields) => {
                if (err) return callback(err);
                // console.log(result[0].Email+" "+result[0].Password + " emailResult");
                return callback(null, result[0]);
            }
        )
    },
    updateJWT: (email, token, callback) => {
        pool.query(`UPDATE user SET JWT = ? WHERE Email = ?`, [token, email],
            (err, result, fields) => {
                if (err) return callback(err);
                return callback(null, result);
            }
        )
    },
    logout: (email, token, callback) => {
        pool.query(`UPDATE user SET JWT = ? WHERE Email = ?`, [token, email],
            (err, result, fields) => {
                if (err) return callback(err);
                return callback(null, result);
            }
        )
    },
    forgotPassword: (password, id, callback) => {
        pool.query(`UPDATE auth SET Password = ? WHERE ID = ?`, [password, id],
            (err, result, fields) => {
                if (err) return callback(err);
                return callback(null, result);
            }
        )
    },
    resetPassword: (id, callback) => {
        pool.query(`SELECT password FROM auth  WHERE UserID = ?`, id, (err, data) => {
            if (err) {
                return callback(err, null);
                
            } else {
                return callback(null, data);
            }
        });
    },
    updatePassword : (id, new_password, result) => {
        const update = `UPDATE auth SET password = ?  WHERE UserID = ?`;
    
        dbConn.query(update, [new_password, id], (err, data) => {
            if (!err) {
                return result(null, data);
            } else {
                return result(err, null);
            }
        });
    }

}