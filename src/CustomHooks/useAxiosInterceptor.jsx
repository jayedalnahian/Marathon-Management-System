import axios from "axios";
import React, { useContext } from 'react';
import { AuthContext } from "../AuthProvider/AuthContext";



const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})




const useAxiosInterceptor = () => {


    const { logout, user } = useContext(AuthContext);
    const token = user?.accessToken;
    
    

    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    })


    axiosInstance.interceptors.response.use(
        res => res,
        err => {
            if (err.response?.status === 401 || err.response?.status === 403) {
                logout().then(() => {
                    console.log(`You are logged out because of an error: ${err.response.status}`);
                }).catch(error => console.log(error));
            }
            return Promise.reject(err);
        }
    );



    return (
        axiosInstance
    );
};

export default useAxiosInterceptor;