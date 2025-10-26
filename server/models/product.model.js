const {DataTypes}=require('sequelize')
const sequelize = require('../config/database')
const Enterprise=require('../models/enterprise.model')

const Product=sequelize.define('Products',{
    name:{type:DataTypes.STRING,allowNull:false},
    sku:{type:DataTypes.STRING,allowNull:false},
    price:{type:DataTypes.FLOAT,allowNull:false},
    category:{type:DataTypes.STRING,allowNull:false},
    stocks:{type:DataTypes.INTEGER,allowNull:false}
})

Product.belongsTo(Enterprise)
Enterprise.hasMany(Product)

module.exports=Product