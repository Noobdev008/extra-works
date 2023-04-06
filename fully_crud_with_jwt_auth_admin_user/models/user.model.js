module.exports =(sequelize,DataTypes)=>{
    const Users =  sequelize.define("users",{
        id:{
            type:DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name:DataTypes.STRING(55),
        email:{
            type:DataTypes.STRING(55),
            unique: true,
        },
        JWT:DataTypes.STRING(255),
        userType:{
            type:DataTypes.STRING(10),
            // defaultValue:"user",
        },
    }) 

    // Users.hasMany(Auths)
    // Auths.belongsTo(Users);
    return Users
}
