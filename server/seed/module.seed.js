const Module=require('../models/module.models')
async function initializeModule() {
    const modules=['User','Role','Employee','Product','Enterprise','Permission']

    try {
        for (const name of modules){
        await Module.findOrCreate({where:{name}})
    }
    console.log("Module Initialized Successfully");
    
    } catch (error) {
        console.log("Unable to Initialize Module",error);
    }
}

module.exports=initializeModule