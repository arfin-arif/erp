import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../layout/DashBoardLayout";
import Main from "../layout/Main";

import Home from "../pages/Home/Home";
import LoginForm from "../pages/Login/LoginForm";
import AllUsers from "../pages/ManageUsers/AllUsers/AllUsers";
import MangeUsers from "../pages/ManageUsers/MangeUsers";
import AddCourse from "../pages/MangaeCourse/AddCourse/AddCourse";
import AllCourses from "../pages/MangaeCourse/AllCourses/AllCourses";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/main',
        element: <Main />,
        children: [


            {
                path: '/main/login',
                element: <LoginForm />
            },
        ]
    },
    {
        path: '/',
        element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        children: [
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/manage-course',
                element: <AddCourse />
            },
            {
                path: '/all-course',
                element: <AllCourses />
            },
            {
                path: '/manage-users',
                element: <MangeUsers />
            },
            {
                path: '/all-users',
                element: <AllUsers />
            },
        ]
    }
])