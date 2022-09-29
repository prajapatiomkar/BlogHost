const express = require("express");
const { signin, signup,signuppage,signinpage,logout } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.get("/signup", signuppage);
userRouter.post("/signin", signin);
userRouter.get("/signin", signinpage);
userRouter.get("/logout", logout);

module.exports = userRouter;