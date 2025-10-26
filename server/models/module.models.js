const {DataTypes}=require('sequelize')
const sequelize=require('../config/database')

const Module=sequelize.define('Module',{
    name:{type:DataTypes.STRING,unique:true}
})

module.exports=Module