import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { coursePostRoute } from '../../../utils/APIRoutes';
import Navbar from '../../Navbar/Navbar';




const AddCourse = () => {
    const [values, setValues] = useState({});
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    console.log('valie', values);
    const { courseTitle, courseCode, creditHours, semester } = values;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { courseTitle, courseCode, creditHours } = values;
        const { data } = await axios.post(coursePostRoute, {
            courseTitle,
            courseCode,
            creditHours,
            semester
        });
        console.log(data);
        if (!data) {
            toast.error(data.msg, toastOptions);
        }
        if (data) {
            toast.success('Successfully added course')

            console.log(data);

            // navigate("/");
        }

    }



    return (


        <>

            <Navbar />
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
                <ToastContainer />
            </div>
        </>

    );
};

export default AddCourse;