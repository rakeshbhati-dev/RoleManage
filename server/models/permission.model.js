const {DataTypes}=require('sequelize')
const sequelize=require('../config/database')
const Role=require('../models/role.model')
const Module=require('../models/module.models')

const Permission=sequelize.define('Permission',{
    can_create:{type:DataTypes.BOOLEAN,defaultValue:false},
    can_read:{type:DataTypes.BOOLEAN,defaultValue:false},
    can_update:{type:DataTypes.BOOLEAN,defaultValue:false},
    can_delete:{type:DataTypes.BOOLEAN,defaultValue:false}
})

Permission.belongsTo(Role)
Permission.belongsTo(Module)

module.exports=Permission