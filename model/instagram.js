const mongoose = require("mongoose");


const instagramSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
});


const Instagram = mongoose.model("Instagram", instagramSchema);

module.exports = Instagram;