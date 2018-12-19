const mongoose = require('mongoose');

// User Schema
const CalendarSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    start:{
        type: String,
        required: true
    },
    end:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    }
});

const Calendar = module.exports = mongoose.model('Calendar', CalendarSchema);