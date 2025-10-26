const Product=require('../models/product.model')
const Enterprise=require('../models/enterprise.model')

const createProduct=async (req,res) => {
    try {
        const {name,sku,price,category,stocks,enterpriseId}=req.body
        const enterprise=await Enterprise.findByPk(enterpriseId)
        if(!enterprise){
            return res.status(404).json({error:"No Enterprise Found"})
        }
        const product=await Product.create({name,sku,price,category,stocks,EnterpriseId:enterpriseId})
        return res.status(201).json({product:product})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const getProduct=async (req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error:"No Product Found"})
        }
        return res.status(200).json({product:product})
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const getAllProduct=async (req,res) => {
    try {
        const productList=await Product.findAll()
        if(productList.length==0){
            return res.status(200).json({message:"No Product Found"})
        }
        return res.status(200).json({productList:productList})
    } catch (error) {
         console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const updateProduct= async (req,res)=>{
    try {
        const {id}=req.params
        const {name,sku,price,category,stocks,enterpriseId}=req.body
        const product=await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error:"No Product Found"})
        }
        if(enterpriseId){
            const enterprise=await Enterprise.findByPk(enterpriseId)
            if(!enterprise){
                return res.status(404).json({error:"Enterprise do not exist"})
            }
            else{
                product.EnterpriseId-enterpriseId
            }
        }
        if(name) product.name=name
        if(sku) product.sku=sku
        if(price) product.price=price
        if(category) product.category=category
        if(stocks) product.stocks=stocks

        await product.save()
        return res.status(200).json({product:product})

    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

const deleteProduct =async (req,res) => {
    try {
        const {id}=req.params
        const deleted=await Product.destroy({where:{id:id}})
        if(deleted==0){
            return res.status(400).json({error:"Unable to delete product"})
        }
        return res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
    }
}

module.exports={createProduct,getProduct,getAllProduct,updateProduct,deleteProduct}