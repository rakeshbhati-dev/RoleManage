const bcrypt = require('bcrypt')
const Role = require('../models/role.model')
const User = require('../models/user.model')
const Module=require('../models/module.models')
const Permission=require('../models/permission.model')
async function initializeAdmin() {

    try {
        const [adminRole] = await Role.findOrCreate({
        where: { name: "Admin" }
    })

    const email = process.env.ADMIN_EMAIL
    const password =process.env.ADMIN_PASSWORD
    const adminName=process.env.ADMIN_NAME
    const hashPassword = await bcrypt.hash(password, 10)

    const [admin] = await User.findOrCreate({
        where: { email: email },
        defaults: {
            name: adminName,
            password: hashPassword,
            RoleId:adminRole.id
        }
    })

    const allModule=await Module.findAll()
    if(allModule.length>0){
        for(const module of allModule){
            await Permission.findOrCreate({
                where:{RoleId:adminRole.id,ModuleId:module.id},
                defaults:{
                    can_create:true,
                    can_read:true,
                    can_update:true,
                    can_delete:true,
                }
            })
        }
    }
    console.log("Admin Initialized Successfully");
    
    } catch (error) {
        console.log("Unable to initialize Admin",error);
    }
}

module.exports=initializeAdmin