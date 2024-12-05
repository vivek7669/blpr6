const { Router } = require("express");
const creaComment = require("../controller/commetController");
const validateToken = require("../middleware/expiToken");


const commRoute = Router();

commRoute.post("/ccom",validateToken,creaComment);

module.exports = commRoute;

