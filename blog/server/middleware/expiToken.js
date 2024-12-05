require("dotenv").config();
const jwt = require('jsonwebtoken');
const user = require('../model/user.schema'); // Path to your user model

async function validateToken(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);
    
    const data = await user.findOne({
      _id: decoded.id,
      'tokens.token': token
    });
    
    if (!data) {
        return res.status(401).send({ error: 'Token Expired' });
    }
      // Filter out expired tokens
    data.tokens = data.tokens.filter((t) => {
      try {
        jwt.verify(t.token, process.env.JWT_SEC_KEY);
        return true; // Token is valid
      } catch (err) {
        return false; // Token is expired
      }
    });
    
    await data.save();

    req.data = data;
    req.token = token;

    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' });
  }

//? my Practice ---
// try {
//     let token = req.header("Authorization").replace("Bearer ","");
//     let decode = jwt.verify(token,process.env.JWT_SEC_KEY);

//     let data = await user.findOne({
//         _id : decode.id,
//         'tokens.token' : token
//     });

//     if(!data) return res.send({msg :"Data Not Founded !"});

//     data.tokens = data.tokens.filter((t)=>{
//         try {
//             jwt.verify(t.token,process.env.JWT_SEC_KEY);
//             return true;
//         } catch (error) {
//             return false;
//         }
//     });
//     await data.save();

//     req.data = data;
//     req.token = token;
//     next();

// } catch (error) {
//     res.send({msg : "Authentication Error"});
// }
}

module.exports = validateToken ;
