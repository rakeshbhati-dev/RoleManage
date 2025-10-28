const router=require('express').Router()
const {createEnterprise,getAllEnterprise,getEnterprise,updateEnterprise,deleteEnterprise}=require('../controllers/enterprise.controller')
const authenticate=require('../middleware/authentication')
const canAccess=require('../middleware/checkPermission')

router.post('/',authenticate,canAccess('Enterprise','create'),createEnterprise)
router.get('/',authenticate,getAllEnterprise)
router.get('/:id',authenticate,getEnterprise)
router.put('/:id',authenticate,canAccess('Enterprise','update'),updateEnterprise)
router.delete('/:id',authenticate,canAccess('Enterprise','delete'),deleteEnterprise)

module.exports=router