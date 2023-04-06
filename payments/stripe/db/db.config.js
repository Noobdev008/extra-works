const {Sequelize ,DataTypes} =  require('sequelize');

const sequelize = new Sequelize('stripe','root','',{
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


db.sequelize.sync({force:false})
.then(() => console.log("sync"))
.catch(err => console.log("sync error: " , err));
db.stripe = require('../model/stripe.model')(sequelize,DataTypes);  

module.exports = db

