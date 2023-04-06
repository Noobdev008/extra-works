module.exports = (sequelize, DataTypes) => {
    const Auths = sequelize.define("auths", {
        aid: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(55),
            unique: true,
            // allowNull: false,
        },
        password: {
            type: DataTypes.STRING(55),
            // allowNull: false,
        },
        forgetPasswordOTP: DataTypes.INTEGER(10),
        isVarified: {
           type: DataTypes.INTEGER(1),
           defaultValue:0
           
        },
        phoneNumber:{
            type: DataTypes.STRING(20),
            unique: true,
        },

    })
    return Auths
}
