const {Sequelize ,DataTypes} =  require('sequelize');

const sequelize = new Sequelize('role_based','root','',{
    host: 'localhost',
    logging:false,
    dialect: 'mysql',
    pool: {max:5,min:0,idle:10000},
});


sequelize.authenticate()
.then(()=>{
    console.log('Sequelize is ready!');
}).catch(err => console.log("sequelize error: " + err));

const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../model/user.model')(sequelize,DataTypes);  
// console.log(db.users +  " hihihi");
db.posts = require('../model/post.model')(sequelize,DataTypes);

db.sequelize.sync({force:false})
.then(() => console.log("sync"))
.catch(err => console.log("sync error: " , err));
db.users = require('../model/user.model')(sequelize,DataTypes);  
db.auths = require('../model/auth.model')(sequelize,DataTypes);
db.posts = require('../model/post.model')(sequelize,DataTypes);
db.users.hasMany(db.auths);
db.users.hasMany(db.posts);
module.exports = db

