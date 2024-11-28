const {Router} = require("express");
const { getAllBloag, genBloag, upload, ModifyBloag, removeBloag } = require("../controller/bloaController");
const chefield = require("../middleware/bloagreqfield");

const BloagRoute = Router();

BloagRoute.get("",getAllBloag);
BloagRoute.post("/create",upload.single('image'),chefield,genBloag);
BloagRoute.patch("/edit/:id",ModifyBloag);
BloagRoute.delete("/delete/:id",removeBloag);

module.exports = BloagRoute ;
