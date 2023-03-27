import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { courseRegRestRoute, getAllCoursesRoute, getCoursePerSemesterRoute } from '../../utils/APIRoutes';
import CourseRegNav from './CourseRegNav/CourseRegNav';

const CourseRegistration = () => {
    const [values, setValues] = useState({});
    const studentId = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;


    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)

    const { semester } = values;


    useEffect(() => {
        console.log('inside');

        console.log('semester', semester);
        // Make a request for a user with a given ID
        if (semester) {
            axios.get(`${getCoursePerSemesterRoute}/${semester}`)

                .then((response) => {
                    if (response) {
                        setCourses(response.data);
                        setError(false);
                    } else {
                        setError(true);
                        setCourses();
                    }
                    setLoading(false);
                });
        }
    }, [semester]);



    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    console.log('valie', values);



    const handleRegistration = async (creditHours) => {
        const { course, semester } = values;
        const { data } = await axios.post(courseRegRestRoute, {
            studentId,
            semester,
            courses: [{
                course,
                // creditHours
            }]
        });
        console.log('after click', values);
        if (!data) {
            toast.error(data.msg, toastOptions);
        }
        if (data) {
            toast.success('Successfully Registered course')

            console.log(data);

            // navigate("/");
        }
    };



    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const { course, creditHours, semester } = values;
    //     const { data } = await axios.post(courseRegRestRoute, {
    //         studentId,
    //         semester,
    //         courses: [{
    //             course,
    //             creditHours
    //         }]
    //     });
    //     console.log('handleSubmit', values);
    //     if (!data) {
    //         toast.error(data.msg, toastOptions);
    //     }
    //     if (data) {
    //         toast.success('Successfully added course')

    //         console.log(data);

    //         // navigate("/");
    //     }
    // }




    return (
        <div>
            <CourseRegNav />



            <div className='flex'>


                <div className="flex justify-center">
                    <div className="mb-[0.125rem] mr-4 mt-6 inline-block min-h-[1.5rem] pl-[1.5rem]">
                        <label for="login-password">Choose Semester</label>
                        <div className="relative">
                            <input name="semester" list='semester'
                                onChange={(e) => handleChange(e)} className=' block w-full text-white focus:text-white bg-[#3A3A5A] border rounded py-3 px-4 mb-3 leading-tight focus:outline-none  ' />
                            <datalist id="semester" >
                                <option value="1" />
                                <option value="2" />
                                <option value="3" />
                                <option value="4" />
                                <option value="5" />
                                <option value="6" />
                                <option value="7" />
                                <option value="8" />
                            </datalist>
                        </div>


                    </div>
                </div>

                {/* <section>
                    <div className='addCourse max-w-lg mx-auto mt-[15%]'>
                        <form onSubmit={(event) => handleSubmit(event)} className="w-full max-w-lg">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-first-name">
                                        Course Title
                                    </label>
                                    <input name="courseTitle"
                                        onChange={(e) => handleChange(e)} className=" block w-full text-white focus:text-black bg-[#3A3A5A] border  rounded py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500" id="grid-first-name" type="text" placeholder="Ex: Networking " />

                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
                                        Course Code
                                    </label>
                                    <input name="courseCode"
                                        onChange={(e) => handleChange(e)} className=" block w-full text-white focus:text-black bg-[#3A3A5A] border  rounded py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500" id="grid-last-name" type="text" placeholder="331" />
                                </div>

                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-state">
                                        Credit Hours
                                    </label>
                                    <div className="relative">
                                        <input name="creditHours"
                                            onChange={(e) => handleChange(e)} className=' apearance-none block w-full text-white focus:text-white bg-[#3A3A5A] border rounded py-3 px-4 mb-3 leading-tight focus:outline-none  ' />
                                        <datalist id="creditHours">
                                            <option value="3" />
                                            <option value="1.5" />
                                        </datalist>
                                    </div>
                                </div>
                                <div className='w-full md:w-1/2 px-3'>
                                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-state">
                                        Semester
                                    </label>
                                    <div className="relative">
                                        <input name="semester" list='semester'
                                            onChange={(e) => handleChange(e)} className=' block w-full text-white focus:text-white bg-[#3A3A5A] border rounded py-3 px-4 mb-3 leading-tight focus:outline-none  ' />
                                        <datalist id="semester" >
                                            <option value="1" />
                                            <option value="2" />
                                            <option value="3" />
                                            <option value="4" />
                                            <option value="5" />
                                            <option value="6" />
                                            <option value="7" />
                                            <option value="8" />
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" className=' border w-full border-blue-300  bg-[mediumslateblue] text-white text-2xl font-semibold  hover: hover:text-black ' value="Submit" />

                        </form>

                    </div>
                </section> */}


                <section className="container px-4 mx-auto">
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Register Your Courses</h2>

                        {/* <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">100 users</span> */}
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
                                                        <span>Semester</span>


                                                    </button>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Credit Hours</span>


                                                    </button>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Action</span>


                                                    </button>
                                                </th>


                                            </tr>
                                        </thead>
                                        {
                                            courses?.map((course) => <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">


                                                <tr>

                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">

                                                        <div className="inline-flex items-center gap-x-3">

                                                            <input onChange={(e) => handleChange(e)} type="checkbox" name="course" value={course?._id} />

                                                            <div className="flex items-center gap-x-2">

                                                                <div>

                                                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{course?.courseTitle}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">


                                                            <h2 className="text-sm font-normal text-emerald-500">{course?.semester}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">

                                                            {/* <input type="checkbox" value={course?.creditHours} name='creditHours'
                                                                onChange={(e) => handleChange(e)} className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}
                                                            <h2 className="text-sm font-normal text-emerald-500">{course?.creditHours}</h2>
                                                        </div>
                                                    </td>
                                                    <td className=" py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-blue-400 ">

                                                            <button onClick={() => handleRegistration(course?.creditHours)} type='submit' className=' '>Add Course</button>
                                                        </div>
                                                    </td>

                                                </tr>

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

            <ToastContainer />
        </div>
    );
};

export default CourseRegistration;