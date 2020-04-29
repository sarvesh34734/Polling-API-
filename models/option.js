const mongoose = require("mongoose");


// create question schema
const optionSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true
    },
    votes: {
        type: Number
    },
    link_to_vote: {
        type: String
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
}, { timestamps: true });


module.exports = mongoose.model("Option", optionSchema);