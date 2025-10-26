const Module = require('../models/module.models')

const getAllModules = async (req, res) => {
    try {
        const moduleList = await Module.findAll()
        if (moduleList.length == 0) {
            return res.status(200).json({ message: "No Module Found" })
        }
        return res.status(200).json({ moduleList: moduleList })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Something went wrong"})
    }
}

module.exports={getAllModules}