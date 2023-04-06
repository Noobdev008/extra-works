module.exports = (sequelize, DataTypes) => {
    const Payments = sequelize.define("rpayment", {
        orderid: DataTypes.STRING(55),
        rsignature:{
             type:DataTypes.STRING(100),
        },
        rpaymentid:{type:DataTypes.STRING(100)},
        payment: {
            type: DataTypes.INTEGER(11),
            default: 6,
        },
        success: {
            type: DataTypes.INTEGER(11),
            default: 0,
        }
    })

    // Users.hasMany(Auths)
    // Auths.belongsTo(Users);
    return Payments
}
