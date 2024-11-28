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
    lowercase: true,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
  },
  likedBy: [{ username: String }],
  comments: [
    {
      text: String,
      username: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const blpost = mongoose.model("blpost", bpostSchema);

module.exports = blpost;
