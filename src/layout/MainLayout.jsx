import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <div className='mx-auto text-center'>
                <Navbar></Navbar>
            </div>
            <div className='flex justify-center items-center h-screen mx-auto'>
                <Outlet></Outlet>
            </div>
            <div className='mx-auto text-center'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;