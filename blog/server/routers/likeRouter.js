const { Router } = require("express");
const {getlikes, addLike, removeLike, allLikeRemove } = require("../controller/likeController");

const likeRoute = Router();

likeRoute.get("/",getlikes);
likeRoute.post("/like",addLike);
likeRoute.delete("/unlike",removeLike);
likeRoute.delete("/allremove",allLikeRemove);

module.exports = likeRoute