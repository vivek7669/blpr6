const checkdata = async (req,res,next) => {
    const { username, password, email } = req.body;
    console.log(req.body);
    
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