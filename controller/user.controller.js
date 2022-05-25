const userService=require('../services/user.service')

const registerUser = async function (req, res) {
    try {
        let response = await userService.register(req,res);
        return res.status(200).json({ status: true, data:response});
    } catch (e) {
        return res.status(400).json({ status: false, error:{message: e.message} });
    }
};

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

module.exports={registerUser,markAsSpam,searchUser}