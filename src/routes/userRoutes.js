const express = require("express");
const { signin, signup,signuppage,signinpage } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.get("/signup", signuppage);
userRouter.post("/signin", signin);
userRouter.get("/signin", signinpage);

module.exports = userRouter;