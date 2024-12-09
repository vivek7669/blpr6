const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blpost" },
    user: { type: mongoose.Schema.ObjectId, ref: "user" },
    text: String,
    // replyTo: String, // if this comment is a reply to another comment, it will store the id of the comment it is replying to.
}, { timestamps: true }); // This will automatically add `createdAt` and `updatedAt`

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
