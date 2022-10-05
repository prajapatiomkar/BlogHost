const adminModel = require("../models/admin");
const noteModel = require("../models/note");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;
const ADMINISTRATOR_PASSWORD = process.env.ADMINISTRATOR_PASSWORD;

const adminLoginPage = (req, res) => {
    res.render("adminLogin");
}
const adminRegisterPage = (req, res) => {
    res.render("adminRegister");
}
const adminLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await adminModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(409).json({ message: "Administrator not found" }) //400-bad request
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password) //(normalPassword,hashpassword)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid  Credentials" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRECT_KEY);
        // console.log(token)
        res.cookie("token", token);
        // res.redirect("/note/main")
        res.redirect("/admin/posts")

        // res.status(200).json({ user: existingUser, token: token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
const adminRegister = async (req, res) => {
    const { username, email, password, administratorpassword } = req.body;

    if (administratorpassword === ADMINISTRATOR_PASSWORD) {
        try {
            const existingUser = await adminModel.findOne({ email: email });
            if (existingUser) {
                return res.status(409).json({ message: "Administrator already exists" }) //400-bad request
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await adminModel.create({
                email: email,
                password: hashedPassword,
                username: username,
            });

            const token = jwt.sign({ email: result.email, id: result._id }, SECRECT_KEY);
            res.cookie("token", token);
            // console.log(token)
            // res.status(201).json({ user: result, token: token }) //201-successfully record created
            res.redirect("/admin/login")
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    } else {
        res.redirect("/admin/register")
    }


}

const getAllUserBlog = async (req, res) => {
    try {
        const notes = await noteModel.find({ isPublic: "true" });
        res.render("adminPanel", { allBlogItemInMain: notes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getSingleBlog = (req, res) => {
    const requestedNo = req.params.id;
    // const sBlog =noteModel
    noteModel.findById(requestedNo, function (err, resultItem) {
        if (err) {
            console.log(err);
        }
        else {
            res.setHeader("Content-Type", "text/html")
            res.render("adminSinglePage", ({ singleBlogMain: resultItem }))
        }

    });
}

const deleteSingleBlog = async (req, res) => {
    const id = req.params.id;

    try {
        const note = await noteModel.findByIdAndRemove(id);
        // res.status(202).json(note);
        res.redirect("/admin/posts")
    } catch (error) {
        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.redirect("/admin/posts")
        
    }

}

module.exports = { adminLoginPage, adminRegisterPage, adminLogin, adminRegister, getAllUserBlog, getSingleBlog,deleteSingleBlog };