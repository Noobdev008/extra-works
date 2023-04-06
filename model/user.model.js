const db = require('../db/db.config')
const Users = db.users
const create = async (name,email)=> {
    // const {name,email,JWT,userType}= req.body.Users
   
    let data = await Users.create({name,email})
    // console.log(data, " data");
    return data
}




module.exports ={
  create
}