const noteModel = require("../models/note");

const getAllNotes = async (req, res) => {
    noteModel.find({isPublic:"true"}, function (err, foundItem) {
        // res.status(201).json(foundItem);
        if(foundItem){
            res.render("home",{allBlogItem:foundItem})
        }
        if(req.cookies.token){
            res.render("/users/main")
        }
        
    })
}

const singleBlogHome = (req,res)=>{
    const requestedNo = req.params.postno;
    // const sBlog =noteModel
    noteModel.findById(requestedNo, function (err, resultItem) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("singlebloghome", ({ singleblogHome: resultItem }))
        }

    });
}
module.exports = { getAllNotes,singleBlogHome};