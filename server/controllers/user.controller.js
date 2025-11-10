const User = require('../models/user.model')
const Role = require('../models/role.model')
const Enterprise = require('../models/enterprise.model')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const { name, email, password, roleId, enterpriseId } = req.body
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ error: "Email ID already existed." })
        }
        const role = await Role.findByPk(roleId)
        if (!role) {
            return res.status(404).json({ error: "No Role Found" })
        }
        const enterprise = await Enterprise.findByPk(enterpriseId)
        if (!enterprise) {
            return res.status(404).json({ error: "No Enterprise Found" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password: hashedPassword, RoleId: roleId, EnterpriseId: enterpriseId
        })
        return res.status(201).json({user:user})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Something went wrong."})
    }
}

const login=async (req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({where:{email}})
        const key=process.env.SECRET_KEY
        if(!user){
            return res.status(404).json({error:"Invalid Email ID."})
        }
        const isValid=await bcrypt.compare(password,user.password)
        if(!isValid){
            return res.status(401).json({error:"Incorrect Password"})
        }
        const token=jwt.sign({userId:user.id,role:user.RoleId},key)
        return res.status(200).json({user:user,token:token})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Something went wrong."})
    }
}

const getParticularUser=async (req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findByPk(id,{include:[Role, Enterprise]})
        if(!user){
            return res.status(404).json({error:"No user found"})
        }
        return res.status(200).json({user:user})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Something went wrong."})
    }
}

const getAllUser=async (req,res)=>{
    try {
        const userList=await User.findAll({include:[Role, Enterprise]})
        if(userList.length==0){
            return res.status(200).json({message:"No user found"})
        }
        return res.status(200).json({userList:userList})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Something went wrong."})
    }
}

const updateUser=async (req,res)=>{
    try {
        const {id}=req.params
        const {name,email,roleId,enterpriseId}=req.body
        const user=await User.findByPk(id)
        if(!user){
            return res.status(404).json({error:"No User found"})
        }
        if(roleId){
            const role=await Role.findByPk(roleId)
            if(!role){
                return res.status(404).json({error:"No role found"})
            }
            user.RoleId=roleId
        }
        if(enterpriseId){
            const enterprise=await Enterprise.findByPk(enterpriseId)
            if(!enterprise){
                return res.status(404).json({error:"No Enterprise found"})
            }
            user.EnterpriseId=enterpriseId
        }
        if(name) user.name=name
        if(email) user.email=email

        await user.save()

        return res.status(200).json({user:user})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Something went wrong."})
    }
}

const deleteUser=async (req,res)=>{
    const {id}=req.params
    try {
        const deletedUser=await User.destroy({where:{id:id}})
        if(deletedUser==0){
            return res.status(400).json({error:"Unable to delete user"})
        }
        else{
            return res.status(200).json({message:"User Deleted Successfully"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Something went wrong."})
    }
}

module.exports={createUser,login,getParticularUser,getAllUser,updateUser,deleteUser}