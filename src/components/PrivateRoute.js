import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
    const { isAuth } = useContext(AuthContext);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/inloggen" state={{ from: location }} replace />;
    }

    return children;
}

export default PrivateRoute;