const router=require('express').Router()
const {createEmployee,getAllEmployee,getEmployee,updateEmployee,deleteEmployee}=require('../controllers/employee.controller')

const authenticate=require('../middleware/authentication')
const canAccess=require('../middleware/checkPermission')

router.post('/',authenticate,canAccess('Employee','create'),createEmployee)
router.get('/',authenticate,canAccess('Employee','read'),getAllEmployee)
router.get('/:id',authenticate,canAccess('Employee','read'),getEmployee)
router.put('/:id',authenticate,canAccess('Employee','update'),updateEmployee)
router.delete('/:id',authenticate,canAccess('Employee','delete'),deleteEmployee)

module.exports=router