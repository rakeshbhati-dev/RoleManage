const router=require('express').Router()
const {setPermission,getPermissionByRole}=require('../controllers/permission.controller')
const authenticate=require('../middleware/authentication')
const canAccess=require('../middleware/checkPermission')

router.post('/',authenticate,canAccess('Permission','create'),setPermission)
router.get('/:id',authenticate,getPermissionByRole)

module.exports=router