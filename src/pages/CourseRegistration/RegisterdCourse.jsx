import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getRegisteredCourseRoute } from '../../utils/APIRoutes';
import CourseRegNav from './CourseRegNav/CourseRegNav';

const RegisterdCourse = () => {
    const studentId = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;

    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [courses, setCourses] = useState([]);


    useEffect(() => {
        console.log('inside registerd coursw');

        // Make a request for a user with a given ID

        axios.get(`${getRegisteredCourseRoute}/${studentId}`)

            .then((response) => {
                if (response) {
                    setCourses(response.data);

                } else {

                    setRegisteredCourses();
                }

            });

    }, [courses.length]);

    // useEffect(() => {
    //     registeredCourses.map((course) => setCourses(course.courses))
    // }, [])
    // console.log('Courses', Courses);
    // Courses?.map((course) => console.log('map', course))


    // const [registrationData, setRegistrationData] = useState([]);
    // const [courseTitles, setCourseTitles] = useState([]);

    // useEffect(() => {
    //     axios.get(`${getRegisteredCourseRoute}/${studentId}`)
    //         .then(res => {
    //             setRegistrationData(res.data);
    //             const titles = res.data.map(registration => registration.courses[0].course.courseTitle);
    //             setCourseTitles(titles);
    //         })
    //         .catch(err => console.log(err));
    // }, []);

    // courseTitles.map(title => console.log(title));












    // console.log(registeredCourses);
    return (
        <div>
            <CourseRegNav />

            <section className="container px-4 mx-auto">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Registered Courses</h2>

                    <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{courses.length}</span>
                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                    <span>Course Name</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Course Code</span>


                                                </button>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Credit Hours</span>


                                                </button>
                                            </th>



                                        </tr>
                                    </thead>
                                    {
                                        courses?.map((courseObj) => <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">


                                            {
                                                courseObj.courses.map(course => <tr>

                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">

                                                        <div className="inline-flex items-center gap-x-3">



                                                            <div className="flex items-center gap-x-2">

                                                                <div>

                                                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{course.course.courseTitle}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">


                                                            <h2 className="text-sm font-normal text-emerald-500">{course.course.courseCode}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">

                                                            {/* <input type="checkbox" value={course?.creditHours} name='creditHours'
                                                            onChange={(e) => handleChange(e)} className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}
                                                            <h2 className="text-sm font-normal text-emerald-500">{course.course.creditHours}</h2>
                                                        </div>
                                                    </td>


                                                </tr>


                                                )

                                            }
                                        </tbody>

                                        )
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </section>



        </div>
    );
};

export default RegisterdCourse;