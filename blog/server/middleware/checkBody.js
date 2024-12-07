const axios = require("axios");
require("dotenv").config();
const checkdata = async (req,res,next) => {
    // const { username, password, email , response} = req.body;
    const { username, password, email} = req.body;
    
    // const resCaptcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${response}`);
    // console.log(resCaptcha);
    // const {success} = resCaptcha.data;
    // if(!success) return res.send({msg : "Authentication Failed."});
    if(!username || !password || !email || username.length <= 0 || password.length <= 0 || email.length <= 0) {
        return res.send({msg : "Please Fill the All Medatory Information."}); //redirecting...
    }
    next();
}
const checkdata1 = async (req,res,next) => {
    const { password, email } = req.body;
    
    if(!password || !email || password.length <= 0 || email.length <= 0) {
        return res.send({msg : "Please Fill the All Medatory Information."}); //redirecting...
    }
    next();
}
module.exports = {checkdata , checkdata1};