const {Router} = require("express");
const { getAllUser, createUser, decodeUser , activateUser ,activateUser1, veriUser ,rmoveUser } = require("../controller/userController");
const {checkdata, checkdata1 } = require("../middleware/checkBody");

const userRoute = Router();

userRoute.get("/",getAllUser);
userRoute.get("/activation/",activateUser);
userRoute.post("/activation/",activateUser1);
userRoute.post("/signup",checkdata,createUser);
userRoute.post("/decodedUser",decodeUser);
userRoute.post("/login",checkdata1,veriUser);
userRoute.delete("/:email",rmoveUser);

module.exports = userRoute;