const {DataTypes}=require('sequelize')
const sequelize=require('../config/database')
const Role=require('../models/role.model')
const Enterprise=require('../models/enterprise.model')

const User=sequelize.define('User',{
    name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false}
})

User.belongsTo(Enterprise)
User.belongsTo(Role)
Enterprise.hasMany(User)
Role.hasMany(User)

module.exports=User