const userService=require('../services/user.service')
const User = require('../config/models/users');
const bcrypt = require('bcryptjs');

const registerUser = async function(req,res){
    if(!req.body.name||!req.body.phone||!req.body.password){
        return res.status(400).json({ status:false, errorResponse:"please enter all fields" });
    }
    if(req.body.password.length<8){
        return res.status(400).json({ status:false, errorResponse:"please enter minimum 8 characters for a secured password" }) 
    }
     bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async(err, hash) => {
            if (err) throw err;
            req.body.password = hash;
            await  User.forge({ name:req.body.name,phone_number:req.body.phone ,email_address:req.body.email,password:req.body.password })
            .save()
            .then(user => {
                delete user.attributes['password']
                return res.status(200).json({ status:true, successResponse:user.attributes })
            }).catch(err=>{
               // console.log(err)
               return res.status(400).json({ status:false, errorResponse:"this phone number is already registered" })
            })
        })})
 }

const userLogin = async function(req,res){
    try{
    let userDetails = await User.where({phone_number:req.body.phoneNumber}).fetch({require:true})
    bcrypt.compare(req.body.password, userDetails.attributes.password, async (err, isMatch) => {
        if(isMatch){
            //doing any functionality according to the requirement
            return res.status(200).json({ status:true, SuccessResponse:"successfully logged in" })
        }
        else{
            return res.status(400).json({ status:false, errorResponse:"invalid password" });
        }
    })

    }catch(err){
        console.log(err)
        return res.status(400).json({ status:false, errorResponse:"invalid phone number" });
    }
}

const markAsSpam = async function (req, res) {
    try {
        var response = await userService.spam(req);
        return res.status(200).json({ status: true, data:response});
    } catch (e) {
        return res.status(400).json({ status: false, error:{message: e.message} });
    }
};

const searchUser = async function (req, res) {
    try {
        var response = await userService.getUsers(req);
        return res.status(200).json({ status: true, data:response});
    } catch (e) {
        return res.status(400).json({ status: false, error:{message: e.message} });
    }
};

module.exports={registerUser,markAsSpam,searchUser,userLogin}