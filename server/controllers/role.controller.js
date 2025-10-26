const Role=require('../models/role.model')

const createRole=async (req,res) => {
    try {
        const {name}=req.body
        const role=await Role.create({name})
        return res.status(201).json({role:role})
    } catch (err) {
        if(err.name==="SequelizeUniqueConstraintError"){
            return res.status(404).json({error:"Role already exist"})
        };
        console.log(err);
        
        return res.status(500).json({error:"Something went wrong"})
    }
}

const getParticularRole= async (req,res)=>{
    try {
        const {id}=req.params
        const role=await Role.findByPk(id)
        if(!role){
            return res.status(404).json({error:"No Role Found."})
        }
        return res.status(200).json({role:role})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const getAllRole= async (req,res)=>{
    try {
        const roleList=await Role.findAll()
        if(roleList.length==0){
            return res.status(200).json({message:"No Role Found"})
        }
        return res.status(200).json({roleList:roleList})
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const updateRole= async(req,res)=>{
    try {
        const {id}=req.params
        const {name}=req.body
        const role=await Role.findByPk(id)
        if(!role){
            return res.status(404).json({error:"No Role Found"})
        }
        if(!name) 
        {
            return res.status(400).json({error:"Please provide role name"})
        }
        role.name=name
        await role.save()
        return res.status(200).json({role:role})
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const deleteRole= async (req,res)=>{
    try {
        const {id}=req.params
        const deletedRole= await Role.destroy({where:{id:id}})
        if(deletedRole==0){
            return res.status(400).json({error:"Unable to delete role"})
        }
        return res.status(200).json({message:"Role deleted successfully"})
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

module.exports={createRole,getParticularRole,getAllRole,updateRole,deleteRole}