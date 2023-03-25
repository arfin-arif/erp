import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    const location = useLocation()


    if (user) {
        return children;
    }

    return <Navigate to='/main/login' state={{ from: location }}></Navigate>;
};

export default PrivateRoutes;