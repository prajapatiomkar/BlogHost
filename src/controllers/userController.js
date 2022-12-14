const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;

// SignUp === Register 
const register = async (req, res) => {
    /*
       Existing User Check
       Hashed Password
       User Creation
       Token Generate
    */
    const { username, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" }) //400-bad request
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRECT_KEY);
        res.cookie("token", token);
        // console.log(token)
        // res.status(201).json({ user: result, token: token }) //201-successfully record created
        res.render("login")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
const registerPage = (req, res) => {
    res.render("register")
}
// SignIn === Login 
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(409).json({ message: "User not found" }) //400-bad request
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password) //(normalPassword,hashpassword)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid  Credentials" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRECT_KEY);
        // console.log(token)
        res.cookie("token", token);
        res.redirect("/note/main")
        // res.status(200).json({ user: existingUser, token: token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const loginPage = (req, res) => {
    res.render("login")
}
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");

}
module.exports = { login, register, registerPage, loginPage, logout };