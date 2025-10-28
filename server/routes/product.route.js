const router=require('express').Router()
const {createProduct,getAllProduct,getProduct,updateProduct,deleteProduct}=require('../controllers/product.controller')
const authenticate=require('../middleware/authentication')
const canAccess=require('../middleware/checkPermission')

router.post('/',authenticate,canAccess("Product",'create'),createProduct)
router.get('/',authenticate,canAccess("Product",'read'),getAllProduct)
router.get('/:id',authenticate,canAccess("Product",'read'),getProduct)
router.put('/:id',authenticate,canAccess("Product",'update'),updateProduct)
router.delete('/:id',authenticate,canAccess("Product",'delete'),deleteProduct)

module.exports=router