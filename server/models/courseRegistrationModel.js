const mongoose = require("mongoose");
const courseRegistrationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    courses: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            // creditHours: {
            //     type: Number,
            //     required: true
            // }
        }
    ]
});
module.exports = mongoose.model('CourseRegistration', courseRegistrationSchema)