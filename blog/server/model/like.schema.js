const mongoose = require("mongoose");


const likeSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.ObjectId , ref : "user"},
    date : {
        type : Date,
        default : Date.now()
    }
})

const like = mongoose.model("like",likeSchema);

module.exports = like;