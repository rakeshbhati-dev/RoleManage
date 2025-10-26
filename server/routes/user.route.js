const router=require('express').Router()
const {createUser,login,getParticularUser,getAllUser,updateUser,deleteUser}=require('../controllers/user.controller')

const authenticate=require('../middleware/authentication')
const canAccess=require('../middleware/checkPermission')

router.post('/',authenticate,canAccess('User','create'), createUser)
router.post('/login', login)
router.get('/',authenticate,canAccess('User','read'), getAllUser)
router.get('/:id',authenticate, getParticularUser)
router.put('/:id',authenticate,canAccess('User','edit'), updateUser)
router.delete('/:id',authenticate,canAccess('User','delete'), deleteUser)
module.exports=router