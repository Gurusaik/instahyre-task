const express=require('express')
const router=express.Router()
const {registerUser,markAsSpam,searchUser}=require('../controller/user.controller.js')

router.post('/register',registerUser)
router.post('/mark-as-spam/:phoneNumber',markAsSpam)
router.get('/search/:userName',searchUser)

module.exports=router

