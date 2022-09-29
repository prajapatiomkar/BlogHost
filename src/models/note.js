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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);