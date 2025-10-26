const {DataTypes}=require('sequelize')
const sequelize=require('../config/database')

const Enterprise=sequelize.define('Enterprises',{
    name:{type:DataTypes.STRING,allowNull:false},
    address:{type:DataTypes.STRING,allowNull:false},
    country:{type:DataTypes.STRING,allowNull:false},
    city:{type:DataTypes.STRING,allowNull:false},
    state:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false},
    website:{type:DataTypes.STRING}
})

module.exports=Enterprise