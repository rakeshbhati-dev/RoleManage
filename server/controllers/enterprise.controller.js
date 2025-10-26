const Enterprise=require('../models/enterprise.model')

const createEnterprise=async (req,res) => {
    try {
        const {name,address,country,city,state,email,website}=req.body
        const enterprise=await Enterprise.create({name,address,country,city,state,email,website})
        return res.status(201).json({enterprise:enterprise})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const getEnterprise= async (req,res)=>{
    try {
        const {id}=req.params
        const enterprise=await Enterprise.findByPk(id)
        if(!enterprise){
            res.status(404).json({error:"No Enterprise Found"})
        }
        return res.status(200).json({enterprise:enterprise})
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const getAllEnterprise=async (req,res)=>{
    try {
        const enterpriseList=await Enterprise.findAll()
        if(enterpriseList.length==0){
           return res.status(200).json({message:"No Enterprise Found"})
        }
        return res.status(200).json({enterpriseList:enterpriseList})
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const updateEnterprise=async (req,res) => {
    try {
        const {id}=req.params
        const {name,address,country,city,state,email,website}=req.body
        const enterprise=await Enterprise.findByPk(id)
        if(!enterprise){
            return res.status(404).json({error:"No Enterprise Found"})
        }
        if(name) enterprise.name=name
        if(address) enterprise.address=address
        if(country) enterprise.country=country
        if(city) enterprise.city=city
        if(state) enterprise.state=state
        if(email) enterprise.email=email
        if(website) enterprise.website=website

       await enterprise.save()
       return res.status(200).json({enterprise:enterprise})
    } catch (error) {
         console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const deleteEnterprise= async (req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Enterprise.destroy({where:{id:id}})
        if(deleted==0){
            return res.status(400).json({error:"Unable to deleted Enterprise"})
        }
        return res.status(200).json({message:"Enterprise Deleted Successfully."})
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

module.exports={createEnterprise,getEnterprise,getAllEnterprise,updateEnterprise,deleteEnterprise}