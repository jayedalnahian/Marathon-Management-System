import axios from "axios";
import React from 'react';



const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})




const useAxiosInterceptor = () => {
    axiosInstance.interceptors.request.use(config=>{
        // config.headers.Authorization = `Bearer ${token}`
        return config;
    })


    axiosInstance.interceptors.response.use(res=>{
        return res
    })
    return (
        axiosInstance
    );
};

export default useAxiosInterceptor;