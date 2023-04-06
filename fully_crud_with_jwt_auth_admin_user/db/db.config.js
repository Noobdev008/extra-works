const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('final_project_admin_user', 'root', '', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 10000 },
});


sequelize.authenticate()
    .then(() => {
        console.log('Sequelize is ready!');
    }).catch(err => console.log("sequelize error: " + err));

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({ force: false })
    .then(() => console.log("sync"))
    .catch(err => console.log("sync error: ", err));
db.users = require('../models/user.model')(sequelize, DataTypes);
db.auths = require('../models/auth.model')(sequelize, DataTypes);
db.posts = require('../models/post.model')(sequelize, DataTypes);
db.users.hasMany(db.auths);
db.users.hasMany(db.posts);
module.exports = db

