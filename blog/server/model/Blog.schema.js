const mongoose = require("mongoose");

const bpostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    lowercase: true,
  },
  content: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId ,
    ref : "user" 
  },
  category: {
    type: String,
  },
  likedBy: [{ type : mongoose.Schema.Types.ObjectId , ref : "user" }],
  comments: [{ type : mongoose.Schema.Types.ObjectId  , ref : "comment"}],
});

const blpost = mongoose.model("blpost", bpostSchema);

module.exports = blpost;
