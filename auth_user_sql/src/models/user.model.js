
const dbConn = require('../../config/db.config');

const User = function (user) {
    this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.email = user.email,
        this.phone = user.phone

}
// console.log(User +"this is user")
// get all users
User.getAllUser = (result) => {
    // const query1 = 'SELECT * FROM user'
    // const query2 = 'SELECT * FROM auth'
    const query = 'SELECT * FROM user JOIN auth ON user.uid = auth.uid'
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error getting ' + err);
            result(null, err)
        } else {
            console.log('user fetched successfully');
            result(null, res)
        }
    })
}

// console.log(User.getAllUser(result)+" HI")

// get user by id

User.getUserById = (id, result) => {
    console.log(id);
    dbConn.query('SELECT first_name,last_name,email ,phone from user JOIN  auth ON user.uid = auth.uid where user.uid =?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching user by id', err);
            result(null, err);
        } else {
            // dbConn.query('SELECT * FROM auth')
            result(null, res);
        }
    })
}

// create new user
User.createUser = (userReqData, result) => {

    dbConn.query('INSERT INTO user(first_name, last_name, email) VALUES(?, ?, ?)', [userReqData.first_name, userReqData.last_name, userReqData.email], (err, res) => {
        console.log(userReqData+" userReqDataaaaa")
        console.log(userReqData.first_name, userReqData.last_name, userReqData.email, userReqData.phone +" all")

        if (err) {
            console.log('Error while inserting data' + err);
            result(null, err);
            
        } else {
            dbConn.query('INSERT INTO auth(phone) VALUES(?)', [userReqData.phone], (err, res) => {
                console.log('user created successfully');
                result(null, res)
            })

        }
    })
}

// update employee
User.updateUser = (id, userReqData, result) => {
    console.log(userReqData + "userReqData");
    console.log(id);
    // // const userReqData = JSON.parse(userReqData1);
    // const updated = data.map((x)=>x.data)
    const query = 'UPDATE user SET first_name=?,last_name=?,email=? WHERE uid=?'
    dbConn.query(query, [userReqData.first_name, userReqData.last_name, userReqData.email, id], (err, data) => {
        console.log(data);
        if (err) {
            console.log('Error while updating the user');
            result(err, null);
        } else {
            console.log(userReqData.phone);
            dbConn.query('UPDATE auth SET phone=? WHERE phone.uid=?', [userReqData.phone, id], (err, data) => {
                console.log("user updated successfully " + data);
                result(null, data);
            })

        }
    });
}

User.deleteUser = (id, result) => {
    // dbConn.query('DELETE FROM employees WHERE id=?', [id], (err, res)=>{
    //     if(err){
    //         console.log('Error while deleting the employee');
    //         result(null, err);
    //     }else{
    //         result(null, res);
    //     }
    // })
    dbConn.query("DELETE FROM user WHERE uid = ?", [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the user ' + err);
            result(null, err);
        } else {
            console.log("user deleted successfully");
            result(null, res);
        }
    });
}

module.exports = User