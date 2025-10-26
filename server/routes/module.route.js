const router= require('express').Router()
const {getAllModules}=require('../controllers/module.controller')

router.get('/',getAllModules)

module.exports=router