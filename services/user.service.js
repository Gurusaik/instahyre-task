const knex = require('../config/knexfile');
const User = require('../config/models/users');
const SpammedUsers =  require('../config/models/spammedUsers');
const { nextTick } = require('process');
exports.register = async function(req,res){
    let userDetails;
    if(!req.body.name||!req.body.phone){
        return res.status(400).json({ status:false, errorResponse:"please enter all fields" });
    }
 await  User.forge({ name:req.body.name,phone_number:req.body.phone ,email_address:req.body.email })
    .save()
    .then((user) => {
        userDetails=user.attributes
      // console.log(user)
    }).catch(err=>{
       // console.log(err)
    })
  return userDetails
}

exports.spam = async function(req){
    try{
     let spammedUser = await SpammedUsers.where({phone_number:req.params.phoneNumber}).fetch({require:true})
     let spamCount = spammedUser.attributes.spam_count
      if(spammedUser){
        await SpammedUsers.where({phone_number:req.params.phoneNumber}).save({spam_count:spamCount+1},{method: 'update', patch: true}) 
      }
    }catch(err){
       await SpammedUsers.forge({phone_number:req.params.phoneNumber,spam_count:1 }).save().then((user) => {
    }).catch(err=>{
        //console.log(err)
    })
       // console.log(err)
    }
    return "successfully marked as spam"
}

exports.getUsers = async function(req){
    let resultArr = []
    let users;
        try{
          users = await User.where('name','like',`%${req.params.userName}%`).fetchAll({require:true})
       }catch(err){
           // console.log(err)
        }
        for(let i=0;i<users.length;i++){
            let spamCount;
            let userObj={}
            userObj.name = users.models[i].attributes.name,
            userObj.email = users.models[i].attributes.email_address
            try{
                let isSpammedUser = await SpammedUsers.where({phone_number:users.models[i].attributes.phone_number}).fetch({require:true})
                spamCount = isSpammedUser.attributes.spam_count
                }catch(err){
                    spamCount=0
                }
            userObj.spammedBy = spamCount
            resultArr.push(userObj)
            }
    return resultArr
}