const mongoose = require('mongoose');

// List means where bunch of movies are stored in array in mongodb 

const ListSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    type: {
        type: String,
    },
    genre: {
        type: String,
    },
    content: {
        type: Array,
    },
   
}, { timestamps: true });

const model =  mongoose.model('List', ListSchema);
module.exports = model;