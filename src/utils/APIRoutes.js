export const host = "http://localhost:5000";
export const loginRoute = `${host}/api/v1/auth/login`;
export const registerRoute = `${host}/api/v1/auth/register`;
export const logoutRoute = `${host}/api/v1/auth/logout`;
export const allUsersRoute = `${host}/api/v1/users/all`;
export const coursePostRoute = `${host}/api/v1/course/post`;
export const getAllCoursesRoute = `${host}/api/v1/course/all-courses`;
export const deleteCoursesRoute = `${host}/api/v1/course/delete`;
export const deleteUserRoute = `${host}/api/v1/users/delete`;
export const deptWiseUserRoute = `${host}/api/v1/users/all`;


export const refresh = () => {
    window.location.reload(true)
}

