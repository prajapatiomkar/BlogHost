const express = require("express");
const adminRouter = express.Router();
// const auth = require("../middlewares/auth")
const {adminLoginPage,adminRegisterPage,adminLogin,adminRegister,getAllUserBlog,getSingleBlog,deleteSingleBlog,detailSingleBlogUser} = require("../controllers/adminController")


adminRouter.get("/login",adminLoginPage)
adminRouter.get("/register",adminRegisterPage)
adminRouter.post("/login",adminLogin)
adminRouter.post("/register",adminRegister)
adminRouter.get("/posts",getAllUserBlog)
adminRouter.get("/posts/:id",getSingleBlog)
adminRouter.get("/posts/delete/:id",deleteSingleBlog)
adminRouter.get("/posts/detail/:id",detailSingleBlogUser)


module.exports = adminRouter;