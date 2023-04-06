

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        pid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(55),
            allowNull: false
        },
        caption: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        isApporved:{
            type: DataTypes.STRING(55),
            defaultValue:"pending",
        },

    });
    return Posts
}