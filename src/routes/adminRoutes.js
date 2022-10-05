const express = require("express");
const adminRouter = express.Router();
// const auth = require("../middlewares/auth")
const {adminLoginPage,adminRegisterPage,adminLogin,adminRegister} = require("../controllers/adminController")


adminRouter.get("/login",adminLoginPage)
adminRouter.get("/register",adminRegisterPage)
adminRouter.post("/login",adminLogin)
adminRouter.post("/register",adminRegister)

module.exports = adminRouter;