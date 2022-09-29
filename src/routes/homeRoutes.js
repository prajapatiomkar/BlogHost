const express = require("express");
const homeRouter = express.Router();
// const auth = require("../middlewares/auth")
const {getAllNotes} = require("../controllers/homeController")
homeRouter.get("/",getAllNotes);
module.exports = homeRouter;