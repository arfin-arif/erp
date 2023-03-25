const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
        unique: true,
    }
    ,
    courseTitle: {
        type: String,
        required: true,
        unique: true,
    }
    ,
    creditHours: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);
