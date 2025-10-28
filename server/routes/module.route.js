const router= require('express').Router()
const {getAllModules}=require('../controllers/module.controller')
const authenticate=require('../middleware/authentication')


router.get('/',authenticate,getAllModules)

module.exports=router