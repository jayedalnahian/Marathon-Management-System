import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../NavbarComponents/Navbar';
import Footer from '../../FooterComponets/Footer';
import 'react-datepicker/dist/react-datepicker.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainLayout = () => {
    return (
        <div>

            <Navbar></Navbar>

            <div className='min-h-screen mx-auto py-10'>
                <Outlet></Outlet>
            </div>
            <div className='mx-auto text-center'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;