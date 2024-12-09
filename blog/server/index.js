require("dotenv").config();
const express = require('express');
const passport = require('passport');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const nodecron = require('node-cron');
const cors = require('cors');
const bodyparser = require('body-parser');
const dbConnector = require('./config/db');
const userRoute = require('./routers/userRouter');
const BloagRoute = require('./routers/bloagRoutes');
const user = require("./model/user.schema");
const initalization = require("./services/goInalize");
const path = require("path");
const likeRoute = require("./routers/likeRouter");
const commRoute = require("./routers/commentRoute");


const app = express();
const port = process.env.PORT || 3040 ;

// Google auth
app.use(session({
    secret : process.env.SESSION_SECKEY,
    resave : false ,
    saveUninitialized : false
}))
initalization(passport);
app.use("/blog/uploads",express.static(path.join((__dirname , "./uploads"))))
app.use(passport.session());
app.use(passport.initialize());


nodecron.schedule("*/1 * * * *",async()=>{
    console.log('CRON : EXPIRED TOKEN REMOVED...');
    const datas = await user.find();

    for(let data of datas){
     if(Array.isArray(data.tokens)){
        data.tokens = data.tokens.filter((t)=>{
            try {
                jwt.verify(t.token , process.env.JWT_SEC_KEY);
                return true;
            } catch (error) {
                return false;
            }
        });
     }

     if(data.isModified("tokens")){
         await data.save();
     }
    }
})

// nodecron.schedule("*/1 * * * *", async () => {
//     console.log('CRON: EXPIRED TOKEN REMOVED...');

//     try {
//         // Fetch all users
//         const datas = await user.find();

//         // Iterate over each user
//         for (let data of datas) {
//             // Ensure tokens are an array of objects (e.g., { token: 'abc123' })
//             if (Array.isArray(data.tokens)) {
//                 // Filter out expired or invalid tokens
//                 data.tokens = data.tokens.filter((t) => {
//                     try {
//                         // Ensure the token is being verified correctly
//                         jwt.verify(t.token, process.env.JWT_SEC_KEY);
//                         return true; // Keep valid token
//                     } catch (error) {
//                         return false; // Remove invalid/expired token
//                     }
//                 });

//                 // Only save the user if the tokens were actually modified
//                 if (data.isModified('tokens')) {
//                     await data.save(); // Save the updated user document
//                 }
//             }
//         }
//     } catch (error) {
//         console.error("Error in cron job:", error);
//     }
// });

app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({extended : true}));

app.get("",(req,res)=>{
    res.send({"msg":"I Am On Here !"});
});

app.use("/user",userRoute);
app.use("/admin",userRoute);
app.use("/superAdmin",userRoute);
app.use("/blog",BloagRoute);
app.use("/lk",likeRoute);
app.use("/comment",commRoute);

app.listen(port , ()=>{
    console.log(`Server Is listening on http://localhost:${port}/`);
    dbConnector();
});