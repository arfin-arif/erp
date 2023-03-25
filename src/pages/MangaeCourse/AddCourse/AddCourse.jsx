import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    const { courseTitle, courseCode, creditHours } = values;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { courseTitle, courseCode, creditHours } = values;
        const { data } = await axios.post(coursePostRoute, {
            courseTitle,
            courseCode,
            creditHours,
        });

        if (!data) {
            toast.error(data.msg, toastOptions);
        }
        if (data) {
            // localStorage.setItem(
            //     process.env.REACT_APP_LOCALHOST_KEY,
            //     JSON.stringify(data.user)
            // );
            toast.success('Successfully added course')

            console.log(data);

            // navigate("/");
        }

    }



    return (


        <>

            <Navbar />
            <div className='addCourse max-w-lg mx-auto mt-[15%]'>


                <form onSubmit={(event) => handleSubmit(event)} class="w-full max-w-lg">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-first-name">
                                Course Title
                            </label>
                            <input name="courseTitle"
                                onChange={(e) => handleChange(e)} class=" block w-full text-white focus:text-black bg-[#3A3A5A] border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Ex: Networking " />

                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
                                Course Code
                            </label>
                            <input name="courseCode"
                                onChange={(e) => handleChange(e)} class=" block w-full text-white focus:text-black bg-[#3A3A5A] border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="331" />
                        </div>

                    </div>
                    <div class="flex flex-wrap ">
                        <div className='w-1/2'>
                            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-state">
                                Credit Hours
                            </label>
                            <div class="relative">
                                <input className=' ppearance-none block w-full text-white focus:text-black bg-[#3A3A5A] border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:bg-white' onChange={(e) => handleChange(e)} list="creditHours" name="creditHours" />
                                <datalist id="creditHours">
                                    <option value="3" />
                                    <option value="1.5" />

                                </datalist>
                            </div>
                        </div>
                        <input name="creditHours"
                            onChange={(e) => handleChange(e)} type="submit" className='ml-2 mt-6 mb-3 border w-[244px] border-blue-300  bg-[mediumslateblue] text-white text-2xl font-semibold  hover:bg-white hover:text-black ' value="Submit" />
                    </div>

                </form>
                <ToastContainer />
            </div>
        </>

    );
};

export default AddCourse;