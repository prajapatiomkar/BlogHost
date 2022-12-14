const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imageLink:{
        type:String,
        require:false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    isPublic: {
        type: String,
        require: false,
        default:false
    },

}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);