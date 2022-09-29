const noteModel = require("../models/note");

const getAllNotes = async (req, res) => {
    noteModel.find({}, function (err, foundItem) {
        // res.status(201).json(foundItem);
        if(foundItem){
            res.render("home",{allBlogItem:foundItem})
        }
        
    })
}


module.exports = { getAllNotes};