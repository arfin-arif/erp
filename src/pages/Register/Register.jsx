import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import '../Login/loginform.css'
import { useNavigate } from 'react-router-dom';
import { registerRoute } from '../../utils/APIRoutes';

const Register = () => {

    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [values, setValues] = useState({
        username: "",
        department: "",
        password: "",
        role: ""

    });

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            // navigate("/");
        }
    }, []);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const { password, username, department, role } = values;
        if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        }
        else if (department === '') {
            toast.error(
                "Department Value cant be empty ",
                toastOptions
            );
            return false;
        }
        else if (role === '') {
            toast.error(
                "Role Value cant be empty ",
                toastOptions
            );
            return false;
        }
        else if (password.length < 6) {
            toast.error(
                "Password should be equal or greater than 6 characters.",
                toastOptions
            );
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, department, role } = values;
            const password = "123456";
            console.log('outsideAxios', username, password, department, role);
            const { data } = await axios.post(registerRoute, {
                username,
                department,
                password,
                role
            });
            console.log('after post', username, department, password, role);
            if (data.status === false) {
                console.log('error ocourd');
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                // localStorage.setItem(
                //     process.env.REACT_APP_LOCALHOST_KEY,
                //     JSON.stringify(data.user)
                // );
                // navigate("/");
            }
        }
        const refresh = () => {
            window.location.reload(true)

        }
        refresh()
    };
    return (
        <div className='formStyle'>
            <form class="form" onSubmit={(event) => handleSubmit(event)} autocomplete="off">
                <div class="form-inner">
                    <h2>User Register</h2>
                    <div class="input-wrapper">
                        <label for="login-username">Username</label>
                        <div class="input-group"><span class="icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"></path>
                            </svg></span>
                            <input className='inputClass' type="text" name="username"
                                onChange={(e) => handleChange(e)} data-lpignore="true" />
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <label for="login-password">Department</label>
                        <div class="input-group"><span class="icon">
                            <svg class="svg-icon" viewBox="0 0 24 24">
                                <path d="M17.283,5.549h-5.26V4.335c0-0.222-0.183-0.404-0.404-0.404H8.381c-0.222,0-0.404,0.182-0.404,0.404v1.214h-5.26c-0.223,0-0.405,0.182-0.405,0.405v9.71c0,0.223,0.182,0.405,0.405,0.405h14.566c0.223,0,0.404-0.183,0.404-0.405v-9.71C17.688,5.731,17.506,5.549,17.283,5.549 M8.786,4.74h2.428v0.809H8.786V4.74z M16.879,15.26H3.122v-4.046h5.665v1.201c0,0.223,0.182,0.404,0.405,0.404h1.618c0.222,0,0.405-0.182,0.405-0.404v-1.201h5.665V15.26z M9.595,9.583h0.81v2.428h-0.81V9.583zM16.879,10.405h-5.665V9.19c0-0.222-0.183-0.405-0.405-0.405H9.191c-0.223,0-0.405,0.183-0.405,0.405v1.215H3.122V6.358h13.757V10.405z"></path>
                            </svg></span>
                            <input className='inputClass' onChange={(e) => handleChange(e)} list="department" name="department" />
                            <datalist id="department">
                                <option value="CSE" />
                                <option value="ME" />
                                <option value="CIVIL" />
                                <option value="ENGLISH" />
                                <option value="LLB" />
                                <option value="BBA" />
                                <option value="ADMIN" />
                            </datalist>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <label for="login-password">Role</label>
                        <div class="input-group"><span class="icon">
                            <svg class="svg-icon" viewBox="0 0 20 20">
                                <path d="M15.573,11.624c0.568-0.478,0.947-1.219,0.947-2.019c0-1.37-1.108-2.569-2.371-2.569s-2.371,1.2-2.371,2.569c0,0.8,0.379,1.542,0.946,2.019c-0.253,0.089-0.496,0.2-0.728,0.332c-0.743-0.898-1.745-1.573-2.891-1.911c0.877-0.61,1.486-1.666,1.486-2.812c0-1.79-1.479-3.359-3.162-3.359S4.269,5.443,4.269,7.233c0,1.146,0.608,2.202,1.486,2.812c-2.454,0.725-4.252,2.998-4.252,5.685c0,0.218,0.178,0.396,0.395,0.396h16.203c0.218,0,0.396-0.178,0.396-0.396C18.497,13.831,17.273,12.216,15.573,11.624 M12.568,9.605c0-0.822,0.689-1.779,1.581-1.779s1.58,0.957,1.58,1.779s-0.688,1.779-1.58,1.779S12.568,10.427,12.568,9.605 M5.06,7.233c0-1.213,1.014-2.569,2.371-2.569c1.358,0,2.371,1.355,2.371,2.569S8.789,9.802,7.431,9.802C6.073,9.802,5.06,8.447,5.06,7.233 M2.309,15.335c0.202-2.649,2.423-4.742,5.122-4.742s4.921,2.093,5.122,4.742H2.309z M13.346,15.335c-0.067-0.997-0.382-1.928-0.882-2.732c0.502-0.271,1.075-0.429,1.686-0.429c1.828,0,3.338,1.385,3.535,3.161H13.346z"></path>
                            </svg>
                        </span>
                            <input className='inputClass' onChange={(e) => handleChange(e)} list="role" name="role" />
                            <datalist id="role">
                                <option value="Student" />
                                <option value="Faculty" />
                                <option value="Admin" />

                            </datalist>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <label for="login-password">Password</label>
                        <div class="input-group"><span class="icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M11.83,1.73C8.43,1.79 6.23,3.32 6.23,3.32C5.95,3.5 5.88,3.91 6.07,4.19C6.27,4.5 6.66,4.55 6.96,4.34C6.96,4.34 11.27,1.15 17.46,4.38C17.75,4.55 18.14,4.45 18.31,4.15C18.5,3.85 18.37,3.47 18.03,3.28C16.36,2.4 14.78,1.96 13.36,1.8C12.83,1.74 12.32,1.72 11.83,1.73M12.22,4.34C6.26,4.26 3.41,9.05 3.41,9.05C3.22,9.34 3.3,9.72 3.58,9.91C3.87,10.1 4.26,10 4.5,9.68C4.5,9.68 6.92,5.5 12.2,5.59C17.5,5.66 19.82,9.65 19.82,9.65C20,9.94 20.38,10.04 20.68,9.87C21,9.69 21.07,9.31 20.9,9C20.9,9 18.15,4.42 12.22,4.34M11.5,6.82C9.82,6.94 8.21,7.55 7,8.56C4.62,10.53 3.1,14.14 4.77,19C4.88,19.33 5.24,19.5 5.57,19.39C5.89,19.28 6.07,18.92 5.95,18.6V18.6C4.41,14.13 5.78,11.2 7.8,9.5C9.77,7.89 13.25,7.5 15.84,9.1C17.11,9.9 18.1,11.28 18.6,12.64C19.11,14 19.08,15.32 18.67,15.94C18.25,16.59 17.4,16.83 16.65,16.64C15.9,16.45 15.29,15.91 15.26,14.77C15.23,13.06 13.89,12 12.5,11.84C11.16,11.68 9.61,12.4 9.21,14C8.45,16.92 10.36,21.07 14.78,22.45C15.11,22.55 15.46,22.37 15.57,22.04C15.67,21.71 15.5,21.35 15.15,21.25C11.32,20.06 9.87,16.43 10.42,14.29C10.66,13.33 11.5,13 12.38,13.08C13.25,13.18 14,13.7 14,14.79C14.05,16.43 15.12,17.54 16.34,17.85C17.56,18.16 18.97,17.77 19.72,16.62C20.5,15.45 20.37,13.8 19.78,12.21C19.18,10.61 18.07,9.03 16.5,8.04C14.96,7.08 13.19,6.7 11.5,6.82M11.86,9.25V9.26C10.08,9.32 8.3,10.24 7.28,12.18C5.96,14.67 6.56,17.21 7.44,19.04C8.33,20.88 9.54,22.1 9.54,22.1C9.78,22.35 10.17,22.35 10.42,22.11C10.67,21.87 10.67,21.5 10.43,21.23C10.43,21.23 9.36,20.13 8.57,18.5C7.78,16.87 7.3,14.81 8.38,12.77C9.5,10.67 11.5,10.16 13.26,10.67C15.04,11.19 16.53,12.74 16.5,15.03C16.46,15.38 16.71,15.68 17.06,15.7C17.4,15.73 17.7,15.47 17.73,15.06C17.79,12.2 15.87,10.13 13.61,9.47C13.04,9.31 12.45,9.23 11.86,9.25M12.08,14.25C11.73,14.26 11.46,14.55 11.47,14.89C11.47,14.89 11.5,16.37 12.31,17.8C13.15,19.23 14.93,20.59 18.03,20.3C18.37,20.28 18.64,20 18.62,19.64C18.6,19.29 18.3,19.03 17.91,19.06C15.19,19.31 14.04,18.28 13.39,17.17C12.74,16.07 12.72,14.88 12.72,14.88C12.72,14.53 12.44,14.25 12.08,14.25Z"></path>
                            </svg></span>
                            <input className='inputClass' type="password" name="password"
                                onChange={(e) => handleChange(e)} id="login-password" data-lpignore="true" />
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn--primary">Sign in</button><a class="btn--text" href="#0">Forgot password?</a>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;