const mongoose = require("mongoose");


const ListSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    type: {type: String},
    genre: {type: String},
    content: {type: Array},
    isSerie: {type: Boolean, default: false},

},{timestamps: true})

module.exports = mongoose.model("List", ListSchema)