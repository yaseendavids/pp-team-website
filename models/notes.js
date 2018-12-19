const mongoose = require('mongoose');

// User Schema
const NotesSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    importance:{
        type: String,
        required: true,
    },
    completed:{
        type: String,
        required: true
    }
});

const Notes = module.exports = mongoose.model('Notes', NotesSchema);