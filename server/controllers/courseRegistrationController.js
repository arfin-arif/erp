const courseRegistrationModel = require("../models/courseRegistrationModel");
const userModel = require("../models/userModel");

module.exports.semesterRegistration = async (req, res, next) => {
    try {
        const student = await userModel.findById(req.body.studentId);
        if (!student) {
            return res.status(400).send({ message: 'Student not found.' });
        }
        const totalCreditHours = req.body.courses.reduce(
            (total, course) => total + course.creditHours,
            0
        );
        if (totalCreditHours > 18) {
            return res
                .status(400)
                .send({ message: 'Total credit hours exceeds limit.' });
        }
        const registration = new courseRegistrationModel(req.body);
        const result = await registration.save();
        res.send(result);
    } catch (err) {
        next(err);
    }
}


module.exports.getRegistrationInfo = async (req, res, next) => {
    const studentId = req.params.studentId;
    console.log(studentId);
    try {
        const registrations = await courseRegistrationModel.find({ studentId: studentId }).populate('courses.course').exec();
        res.json(registrations);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// backend route
// app.get('/registration/:studentId',


module.exports.getRegisteredCourses = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        console.log(studentId);
        const registrations = await courseRegistrationModel.find({ studentId }).populate('courses.course');
        res.json(registrations);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
