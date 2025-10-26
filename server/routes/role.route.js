const router=require('express').Router()
const {createRole,getAllRole,getParticularRole,updateRole,deleteRole}=require('../controllers/role.controller')
const authenticate=require('../middleware/authentication')
const canAccess=require('../middleware/checkPermission')

router.post('/',authenticate,canAccess('Role','create'),createRole)
router.get('/',authenticate,canAccess('Role','read'),getAllRole)
router.get('/:id',authenticate,canAccess('Role','read'),getParticularRole)
router.put('/:id',authenticate,canAccess('Role','update'),updateRole)
router.delete('/:id',authenticate,canAccess('Role','delete'),deleteRole)

module.exports=router