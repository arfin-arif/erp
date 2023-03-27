const Course = require('../models/courseModel');

module.exports.postCourses = async (req, res, next) => {
    try {
        const { courseCode, courseTitle, creditHours, semester } = req.body;
        const course = new Course({
            courseCode,
            courseTitle,
            creditHours,
            semester
        });
        console.log(course);
        await course.save();
        res.send(course);
    } catch (err) {
        next(err)
        console.error(err);
        res.status(500).send('An error occurred while creating the course.');
    }
}

module.exports.getAllCourse = async (req, res, next) => {
    try {
        const courses = await Course.find({});
        res.send(courses);
    } catch (err) {
        next(err)
        console.error(err);
        res.status(500).send('An error occurred while retrieving the courses');
    }
}
module.exports.getRangeOfCourses = async (req, res, next) => {
    try {
        const startCode = req.query.startCode;
        const endCode = req.query.endCode;
        if (startCode && endCode) {
            const courses = await Course.find({ courseCode: { $gte: startCode, $lte: endCode } });
            res.send(courses);
        } else {
            res.status(400).send('Please provide both startCode and endCode query parameters.');
        }
    }
    catch (err) {
        next(err)
        console.error(err);
        res.status(500).send('An error occurred while retrieving the courses');
    }
}
module.exports.getCoursePerSemester = async (req, res) => {
    try {
        const semester = req.params.semester;
        const courses = await Course.find({ semester: semester });
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports.deleteCourse = async (req, res, next) => {

    try {
        const courseCode = req.params.courseCode;
        console.log(courseCode);
        const result = await Course.deleteOne({ courseCode: courseCode });
        if (result.deletedCount === 1) {
            res.send(`Course with course code ${courseCode} has been deleted.`);
        } else {
            res.status(404).send(`Course with course code ${courseCode} not found.`);
        }
    } catch (err) {
        next(err)
        console.error(err);
        res.status(500).send('An error occurred while deleting the course.');
    }
}