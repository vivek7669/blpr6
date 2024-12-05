const  mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user : { type : mongoose.Schema.ObjectId , ref : "user" },
    text : String,
    // replyTo : String,  // if this comment is a reply to another comment, it will store the id of the comment it is replying to.
    date : {
        type : Date,
        default : Date.now()
    } 
})

const comment = mongoose.model("comment",commentSchema);

module.exports = comment;