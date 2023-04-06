module.exports = (sequelize, DataTypes) => {
    const Auths = sequelize.define("auths", {
        aid: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
        },
        password: DataTypes.STRING(255),
        forgetPasswordOTP: DataTypes.INTEGER(10),
        isVarified: {
            type: DataTypes.BOOLEAN,
        },
        phoneNumber: DataTypes.STRING(20),
            
    })
    return Auths
}
