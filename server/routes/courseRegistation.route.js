const { semesterRegistration, getRegistrationInfo, getRegisteredCourses } = require("../controllers/courseRegistrationController");

const router = require("express").Router();
router.post('/', semesterRegistration);
router.get('/get/:studentId', getRegistrationInfo)
router.get('/:studentId', getRegisteredCourses)

module.exports = router;