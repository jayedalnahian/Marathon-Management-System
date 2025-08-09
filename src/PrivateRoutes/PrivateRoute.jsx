
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthContext';
import { Navigate, } from 'react-router';
import Loading from '../Components/LoadingComponents/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <Loading></Loading>
    if (!user) return <Navigate to="/login" />;



    return children

};

export default PrivateRoute;