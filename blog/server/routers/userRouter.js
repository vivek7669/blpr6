const {Router} = require("express");
const { getAllUser , getAlladm , verifyAdm , createUser, decodeUser , activateUser ,activateUser1, veriUser ,rmoveUser, getAllusr } = require("../controller/userController");
const {checkdata, checkdata1 } = require("../middleware/checkBody");
const validateToken = require("../middleware/expiToken");
const passport = require("passport");

const userRoute = Router();

userRoute.get("/",getAllUser);
userRoute.get("/adm",getAlladm);
userRoute.get("/usr",getAllusr);
userRoute.get("/activation/",activateUser);
userRoute.post("/activation/",activateUser1);
userRoute.post("/adm/verify",verifyAdm);
userRoute.post("/signup",checkdata,createUser);
userRoute.post("/decodedUser",validateToken,decodeUser);
userRoute.post("/login",checkdata1,veriUser);
userRoute.delete("/:email",rmoveUser);

// Google Auth Routes :

userRoute.get("/auth/google",passport.authenticate("google",{scope : ["profile","email"]}));
userRoute.get("/auth/google/callback",passport.authenticate("google",{failureRedirect : "http://127.0.0.1:5500/web/login.html"}),(req,res)=>{   
    res.redirect(`http://127.0.0.1:5500/web/index.html?user=${req.user.tokens[req.user.tokens.length-1].token.toString()}`);
});

module.exports = userRoute;