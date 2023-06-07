const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({

    movie: {
        type: String,
    },
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
    },
    imgTitle: {
        type: String,
    },
    imgSm: {
        type: String,
    },
    video: {
        type: String,
    },
    year: {
        type: String,
    },
    limit: {
        type: Number,
    },
    genre: {
        type: String,
    },
    isSeries: {
        type: Boolean,
        default: false,
    },



}, { timestamps: true });

const model =  mongoose.model('Movie', MovieSchema);
module.exports = model;