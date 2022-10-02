const express = require("express");
const noteRouter = express.Router()
const auth = require("../middlewares/auth")
const { createNote, updateNote, deleteNote, getNotes, getAllNotes, createNotePage, singleBlogMain, postnoyourblog } = require("../controllers/noteController");

noteRouter.get("/yourblog", auth, getNotes);
noteRouter.get("/yourblog/:postnoyourblog", postnoyourblog);

noteRouter.get("/main", auth, getAllNotes);

noteRouter.get("/createpost", auth, createNotePage);

noteRouter.get("/:postnomain", auth, singleBlogMain);

noteRouter.post("/update/:id", auth, updateNote);

noteRouter.post("/", auth, createNote);

noteRouter.get("/delete/:id", auth, deleteNote);


module.exports = noteRouter;