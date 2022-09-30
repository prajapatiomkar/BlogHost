const noteModel = require("../models/note");

const createNote = async (req, res) => {
    const { title, description,imageLink } = req.body;
    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId,
        imageLink:imageLink
    });
    try {
        await newNote.save();
        res.render("createblog")
        // res.status(201).json(newNote);
        // res.render("home",{allBlogItem:[{title:"fddfd",description:"sdasds"}]})
    } catch (error) {
        console.log(error)
        res.render("home")
        // res.status(500).json({ message: "Something went wrong" });
    }
}
const createNotePage = (req,res)=>{
    res.render("createblog")
}
const updateNote = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const { title, description,imageLink } = req.body;
    const newNote = {
        title: title,
        description: description,
        imageLink:imageLink,
        userId:req.userId
    };

    try {
        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        // res.status(200).json(newNote);
        res.redirect("/note/yourblog")
    } catch (error) {

    }
}
const deleteNote = async (req, res) => {
    const id = req.params.id;

    try {
        const note = await noteModel.findOneAndDelete(id);
        res.status(202).json(note);
    } catch (error) {
        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.status(200).json(newNote);
    }

}
const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ userId: req.userId });
        res.render("yourblog",{yourBlogItemInMain:notes})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}
const getAllNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ });
        res.render("main",{allBlogItemInMain:notes})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}

const singleBlogMain = (req,res)=>{
    const requestedNo = req.params.postnomain;
    // const sBlog =noteModel
    noteModel.findById(requestedNo, function (err, resultItem) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("singleblogmain", ({ singleBlogMain: resultItem }))
        }

    });
   
}

const postnoyourblog = (req,res)=>{
    const requestedNo = req.params.postnoyourblog;
    // const sBlog =noteModel
    noteModel.findById(requestedNo, function (err, resultItem) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("updateblog", ({ updateYourSingleBlog: resultItem }))
        }

    });
   
}
module.exports = { createNote, updateNote, deleteNote, getNotes,createNotePage,getAllNotes,singleBlogMain,postnoyourblog };