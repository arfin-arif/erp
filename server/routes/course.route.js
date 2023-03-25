const { postCourses, getAllCourse, getRangeOfCourses, deleteCourse } = require("../controllers/courseController");

const router = require("express").Router();
router
    /**
     * @apiPost to post new course
     */
    .post('/post', postCourses)
router
    /**
     *  t@apiGet to get all the courses
     */
    .get('/all-courses', getAllCourse)
router
    /**
     *  @apiGet to get all the courses
     *  @api   http://localhost:5000/api/v1/course?startCode=321&endCode=322
     */
    .get('/', getRangeOfCourses)
router
    /**
     *  @apiDelete to get all the courses
     *  @api   http://localhost:5000/api/v1/course/delete
     */
    .delete('/delete/:courseCode', deleteCourse)

module.exports = router;