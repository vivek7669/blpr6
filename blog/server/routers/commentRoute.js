const { Router } = require("express");
// const {creaComment , getAllComments , getCommentsByblog} = require("../controller/commetController");
const {creaComment , getAllComments } = require("../controller/commetController");
const validateToken = require("../middleware/expiToken");


const commRoute = Router();

commRoute.get("/getComment",getAllComments);
// commRoute.post("/commByBlog",getCommentsByblog);
commRoute.post("/ccom",creaComment);

module.exports = commRoute;

