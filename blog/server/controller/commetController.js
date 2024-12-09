const blpost = require("../model/Blog.schema");
const comment = require("../model/comment.schema");
const user = require("../model/user.schema");

const getAllComments = async (req,res) => {
      try {
          const data = await comment.find().populate("user").populate("blogId");
          res.send({data})
      } catch (error) {
        res.send({error})
      }
}

const creaComment = async (req,res) => {
    const {userid ,text , pid} = req.body;
//     console.log(req.body);  
try {
        let commentData = await comment.create({user:userid , text : text , blogId : pid});
        let findUser = await  user.findById(userid);
        let userEmail = findUser?.email;
        let findBlog = await blpost.findOne({_id : pid});
        console.log(commentData)
    let n =new Date(commentData.createdAt)
    console.log(n.toLocaleString())
    
        findBlog.comments.push(commentData._id)
        await findBlog.save();
        return res.send({msg : "Comment Seccessfully." , uEmail : userEmail , commentData})
} catch (error) {
        res.send({msg : "Comment Created-Time Error !" , error});
}
}

module.exports = {creaComment , getAllComments} ;
// module.exports = {creaComment , getAllComments} ;
