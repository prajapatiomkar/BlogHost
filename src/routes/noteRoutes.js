const express = require("express");
const noteRouter = express.Router()
const auth = require("../middlewares/auth")
const { createNote, updateNote, deleteNote, getNotes,getAllNotes,createNotePage,singleBlogMain,postnoyourblog} = require("../controllers/noteController");

noteRouter.get("/yourblog", auth, getNotes);
noteRouter.get("/yourblog/:postnoyourblog", postnoyourblog);

noteRouter.get("/main", auth, getAllNotes);

noteRouter.get("/createpost",createNotePage);

noteRouter.get("/:postnomain",singleBlogMain);

noteRouter.post("/update/:id",updateNote);

noteRouter.post("/", auth, createNote);

noteRouter.delete("/:id", auth, deleteNote);


module.exports = noteRouter;