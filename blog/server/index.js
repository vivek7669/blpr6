require("dotenv").config();
const express = require('express');
const jwt = require("jsonwebtoken");
const nodecron = require('node-cron');
const cors = require('cors');
const bodyparser = require('body-parser');
const dbConnector = require('./config/db');
const userRoute = require('./routers/userRouter');
const BloagRoute = require('./routers/bloagRoutes');
const user = require("./model/user.schema");


const app = express();
const port = process.env.PORT || 3040 ;
nodecron.schedule("*/1 * * * *",async()=>{
    console.log('CRON : EXPIRED TOKEN REMOVED...');
    const datas = await user.find();

    for(let data of datas){
        data.tokens = data.tokens.filter((t)=>{
            try {
                jwt.verify(t.token , process.env.JWT_SEC_KEY);
                return true;
            } catch (error) {
                return false;
            }
        });

        await user.save();
    }
})

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({extended : true}));

app.get("",(req,res)=>{
    res.send({"msg":"I Am On Here !"});
});

app.use("/user",userRoute);
app.use("/blog",BloagRoute);

app.listen(port , ()=>{
    console.log(`Server Is listening on http://localhost:${port}/`);
    dbConnector();
});
