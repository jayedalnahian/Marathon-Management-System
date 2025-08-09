import React from 'react';
import { Link } from 'react-router';
import errorIMG from '../../../public/404-error-image.gif'
const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white">
            <div className="text-center px-6 max-w-lg">
                <img className='border border-black rounded-2xl mt-5' src={errorIMG} alt="" />
                <h1 className="text-8xl font-extrabold text-primary drop-shadow-lg">404</h1>
                <p className="text-2xl mt-4 font-semibold text-gray-800">Page Not Found</p>
                <p className="text-gray-500 mt-2">
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>
                <Link to="/" className="inline-block mt-6 px-6 py-3 text-white bg-primary hover:bg-primary-dark transition rounded-lg text-lg shadow-md">
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;