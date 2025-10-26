const router=require('express').Router()
const {createEnterprise,getAllEnterprise,getEnterprise,updateEnterprise,deleteEnterprise}=require('../controllers/enterprise.controller')

router.post('/',createEnterprise)
router.get('/',getAllEnterprise)
router.get('/:id',getEnterprise)
router.put('/:id',updateEnterprise)
router.delete('/:id',deleteEnterprise)

module.exports=router