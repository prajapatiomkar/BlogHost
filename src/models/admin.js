const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Admin", AdminSchema);