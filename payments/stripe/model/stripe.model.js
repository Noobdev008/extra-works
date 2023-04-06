const { default: Stripe } = require("stripe")

module.exports =(sequelize,DataTypes)=>{
    const Stripes =  sequelize.define("stripe",{
        orderid:DataTypes.STRING(100),
        payment_done:{
            type:DataTypes.INTEGER(11),
            default:0
        },
        amount:DataTypes.INTEGER(55),
        currency:DataTypes.STRING(10),
        method:DataTypes.STRING(55),
    }) 

    // Users.hasMany(Auths)
    // Auths.belongsTo(Users);
    return Stripes
}
