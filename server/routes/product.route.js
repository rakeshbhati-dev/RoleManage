const router=require('express').Router()
const {createProduct,getAllProduct,getProduct,updateProduct,deleteProduct}=require('../controllers/product.controller')

router.post('/',createProduct)
router.get('/',getAllProduct)
router.get('/:id',getProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)

module.exports=router