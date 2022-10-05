const noteModel = require("../models/admin");

const adminLoginPage = (req,res)=>{
    res.render("adminLogin");
}
const adminRegisterPage = (req,res)=>{
    res.render("adminRegister");
}
const adminLogin = (req,res)=>{
    res.send("login")
}
const adminRegister = (req,res)=>{
    res.send("register")
}

module.exports = { adminLoginPage,adminRegisterPage,adminLogin,adminRegister};