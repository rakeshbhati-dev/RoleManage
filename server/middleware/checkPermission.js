const User=require('../models/user.model')
const Module=require('../models/module.models')
const Permission=require('../models/permission.model')

const canAccess=(moduleName,action)=>{
    return async (req,res,next)=>{
        try {
            const userId=req.user.id
            const user=await User.findByPk(userId)
            if(!user){
                return res.status(401).json({ error: 'User not found' });
            }

            const roleId=user.RoleId

            const module=await Module.findOne({where:{name:moduleName}})
            if(!module){
                return res.status(404).json({ error: 'Module not found' });
            }

            const permission=await Permission.findOne({where:{roleId,ModuleId:module.id}})

            if(!permission || !permission[`can_${action}`]){
                return res.status(403).json({ message: 'Access denied' })
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:"Something went wrong"})
        }
    }
}

module.exports=canAccess