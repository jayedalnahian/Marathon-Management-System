
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';
import { Navigate,} from 'react-router';
import Loading from '../pages/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading} = useContext(AuthContext);
    if (loading) return <Loading></Loading>
    if (!user) return <Navigate to="/login"  />;



    return (
        { children }
    );
};

export default PrivateRoute;