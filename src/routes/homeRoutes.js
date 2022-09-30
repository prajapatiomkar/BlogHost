const express = require("express");
const homeRouter = express.Router();
// const auth = require("../middlewares/auth")
const {getAllNotes,singleBlogHome} = require("../controllers/homeController")

homeRouter.get("/",getAllNotes);
homeRouter.get("/main",getAllNotes);
homeRouter.get("/:postno",singleBlogHome);

module.exports = homeRouter;