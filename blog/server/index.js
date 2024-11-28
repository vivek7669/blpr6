require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const dbConnector = require('./config/db');
const userRoute = require('./routers/userRouter');
const BloagRoute = require('./routers/bloagRoutes');


const app = express();
const port = process.env.PORT || 3040 ;

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
