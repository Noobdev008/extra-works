

module.exports = (sequelize,DataTypes)=>{
    const Posts = sequelize.define('posts',{
        pid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(55),
            unique: true,
        },
        caption:{
            type: DataTypes.STRING(500),
            allowNull: true,
        },

    });
    return Posts
}