require("dotenv").config();
const user = require("../model/user.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
let option, link;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chauhanvivek0918@gmail.com",
    pass: process.env.EM_SE_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const getAllUser = async (req, res) => {
  try {
    let data = await user.find();
    return res.send({ data });
  } catch (error) {
    return res.send({ err: error });
  }
};

const createUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let isExist = await user.findOne({ email });

    if (isExist || isExist != null)
      return res.send({ msg: "User Already Exist" }); // redirecting to login page...
    data = {
        username,
        password : await bcrypt.hash(password,10),
        email
    }
    // console.log(data.password);
    
    let udata = await user.create(data);
    let genToken = await udata.genAuthToken();

    link = `<a href="http://localhost:8090/user/activation/?verifyLink=${genToken}">Go To Your Dashbord And Active Your Accont</a>`;
    const createoption = (async (email, link) => {
      option = {
        from: "chauhanvivek0918@gmail.com",
        to: email,
        subject: "Account Verfication Message By BloagApp.",
        html: `<h5>${link}</h5>`,
      };
    })(email, link);
    await transport.sendMail(option, (err, info) => {
      if (err) console.log(err);
      // console.log(info);
    });
    // use nodemailer and send link from user email.
    return res.send({ msg: "User Successfully Registerd.", udata }); // first to check user email alrady is exist or not send link for his dashbordd page in gmail via req.query and account is activation and redirect to other page some time...
  } catch (error) {
    return res.send({ msg: "User Created Time Error Occured.", err: error });
  }
};

const decodeUser = async (req,res) => {
   const {data} = await req.body
   let decrypt_data = await jwt.verify(data , process.env.JWT_SEC_KEY);
   const us_data = await user.findOne({_id : decrypt_data.id});
   res.send({us_data});
}

const activateUser = async (req, res) => {
  const { verifyLink } = req.query;
  try {
    const decodetoken = await jwt.verify(verifyLink, process.env.JWT_SEC_KEY);
    // console.log(decodetoken);
    const udata = await user.findByIdAndUpdate(
      { _id: decodetoken.id },
      { activation: true },
      { new: true }
    );
    return res.redirect(`http://127.0.0.1:5500/blog/client/index.html?userData=${encodeURIComponent(JSON.stringify(udata))}`);
    // return res.send({ msg: `Account Activate Successfully.`, udata });
  } catch (error) {
    return res.status(501).send({msg : "Database Error !"});
  }
};

const veriUser = async (req, res) => {
  let { email, password } = req.body;
  const data = await user.findOne({ email });

try {
  if (data) {
    const chepass = await bcrypt.compare(password, data.password);
    console.log(chepass);

    // if (!chepass) {
    //   return res.send({ msg: "Data invalid." });
    // }
    const ltoken = await data.genAuthToken(); 
    return res.status(201).send({ msg: "Login SuccessFully." , ltoken});
  } else {
    return res.status(401).send({ msg: "User Not Founded !"});
  }
} catch (error) {
  return res.status(501).send({msg : "Database Error !"});
}
}; //! password Comparing Is not Work Properly ❌

  
  
  
const rmoveUser = async (req, res) => {
  const { email } = req.params;
  const data = await user.deleteMany({ email });
  return res.send({ msg: "Data deleted.", data });
};
const activateUser1 = async (req, res) => {
  const { userData } = req.query;
  console.log(userData);
  console.log(req.query);
  
  const data = await user.deleteMany({ email });
  return res.send({ msg: "Data deleted.", data });
};

module.exports = { getAllUser, createUser, decodeUser, activateUser1 ,activateUser, veriUser, rmoveUser };
