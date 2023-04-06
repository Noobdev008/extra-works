const pool = require('.././config/db.config')

module.exports = {
    create: (data, callback) => {
        // let selectQuery = 'SELECT * FROM user where id=1'
        pool.query(
            `INSERT INTO post(Title,Caption,created_at,updated_at,UserID,status) VALUES (?,?,?,?,?,?)`,
            [data.Title, data.Caption, data.created_at, data.updated_at, data.UserID,data.status],
            (err, res) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, res);
            }
        )
    },
    getPost: (callback) => {
        pool.query(`SELECT * from user inner join post on user.ID = post.UserID`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },
    getPostById: (id, callback) => {
        pool.query(`SELECT * from user inner join post on user.ID = post.UserID where post.ID = ?`,[id],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },
    updatePost: (data, callback) => {
        console.log(data+" data updated");
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
                pool.query(`UPDATE post set Title =?, Caption =?, created_at=?, updated_at=? where UserID = ?`,

                    [
                        data.Title,
                        data.Caption,
                        data.created_at,
                        data.updated_at,
                        data.UserID
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
    deletePost: (data, callback) => {
        pool.query(`delete from post where id=?`,
            [data.id],
            (err, results) => {
                console.log(results[0]+" deleted")
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        )
    },
    getPostByEmail: (email, callback) => {
        pool.query(`SELECT * FROM post where userEmail = ?`,
            [email],
            (err, result, fields) => {
                if (err) return callback(err);
                return callback(null, result[0]);
            }
        )
    },
    adminPost: (callback) => {
        pool.query(`SELECT * from user inner join post on user.ID = post.UserID`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },
    userPost: (callback) => {
        pool.query(`SELECT * from post where status = 'approved' OR status = 'pending'`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    

}