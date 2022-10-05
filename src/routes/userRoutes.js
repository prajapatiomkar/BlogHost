const express = require("express");
const { login, register,registerPage,loginPage,logout } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.get("/register", registerPage);
userRouter.post("/login", login);
userRouter.get("/login", loginPage);
userRouter.get("/logout", logout);

module.exports = userRouter;