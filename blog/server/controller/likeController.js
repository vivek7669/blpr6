const blpost = require("../model/Blog.schema");
const like = require("../model/like.schema");

const getlikes = async(req,res) => {
    let data = await like.find().populate("user");
    res.send({data})
} 


const addLike = async (req, res) => {
  let { logUser , id } = req.body;
console.log(req.body);

  try {
    let data = await like.create({ user: logUser });
    console.log(data._id);
    let dataBlog = await blpost.findOne({_id:id}) 
    dataBlog.likedBy.push(data.user);
    await dataBlog.save();
    res.send({ msg: "liked", data });
  } catch (error) {
    res.send({ msg: "liked Created Time Error.", error });
  }
};
const removeLike = async (req, res) => {
    let { logUser, id } = req.body;
    try {
      let data = await like.deleteOne({ user: logUser });
      console.log(data);
      
      let dataBlog = await blpost.findOne({_id:id})
      dataBlog.likedBy.pop(data._id);
      await dataBlog.save();
      res.send({ msg: "Unliked", data });
    } catch (error) {
      res.send({ msg: "liked Removed Time Error.", error });
    }
};

const allLikeRemove = async (req,res) => {
try {
    let data = await like.deleteMany({})
    res.send({data})
} catch (error) {
    res.send({error})
}
}

module.exports = {getlikes, addLike, removeLike ,allLikeRemove };
