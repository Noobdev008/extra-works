const {Sequelize ,DataTypes} =  require('sequelize');

const sequelize = new Sequelize('razorpay','root','',{
    host: 'localhost',
    logging:false,
    dialect: 'mysql',
    pool: {max:5,min:0,idle:10000},
});


sequelize.authenticate()
.then(()=>{
    console.log('Sequelize is ready!');
}).catch(err => console.log("sequelize error: Database disconnect "));

const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({force:false})
.then(() => console.log("sync"))
.catch(err => console.log("sync error: Please turn on the database then reload" ));
db.payment = require('../model/payment.model')(sequelize,DataTypes);  
module.exports = db

