const {DataTypes}=require('sequelize')
const sequelize=require('../config/database')
const Role=require('../models/role.model')
const Enterprise=require('../models/enterprise.model')

const Employee=sequelize.define('Employees',{
    name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    department:{type:DataTypes.STRING,allowNull:false},
    salary:{type:DataTypes.FLOAT,allowNull:false},
    status:{type:DataTypes.ENUM('Active','Inactive','On Leave'),defaultValue:'Active'},
})

Employee.belongsTo(Enterprise)
Employee.belongsTo(Role)

Enterprise.hasMany(Employee)
Role.hasMany(Employee)

module.exports=Employee