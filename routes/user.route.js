const express=require('express')
const router=express.Router()
const {registerUser,markAsSpam,searchUser,userLogin}=require('../controller/user.controller.js')

router.post('/register',registerUser)
router.post('/login',userLogin)
router.post('/mark-as-spam/:phoneNumber',markAsSpam)
router.get('/search/:phoneNumber',searchUser)

module.exports=router

