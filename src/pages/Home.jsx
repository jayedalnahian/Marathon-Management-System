import React, { useContext, useEffect } from 'react';
import HeroSlider from '../components/home/HeroSlider';
import SixMarathons from '../components/home/SixMarathons';
import UpcomingMarathons from '../components/home/UpcomingMarathons';
import QnA from '../components/home/QnA';
import Chat from '../components/home/Chat';
import { FaRunning } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { Link } from 'react-router';
import { AuthContext } from '../providers/AuthContext';


const Home = () => {
    const { user } = useContext(AuthContext);   
    useEffect(() => {
        document.title = 'RUN | Home';
    }, []);

    return (
        <div>
            <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://i.ibb.co/LhHX9Tks/marathon-image-1.webp')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center px-6 md:px-16 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                        Run Beyond Limits. <br /> Join the <span className="text-yellow-400">Marathon Revolution</span>.
                    </h1>
                    <p className="mt-6 text-lg md:text-xl font-medium text-gray-100 drop-shadow-md">
                        Discover events. Challenge yourself. Be part of something unforgettable.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        {!user ? <><Link to="/register" className="btn btn-warning btn-lg shadow-xl gap-2">
                            <FaRunning className="text-xl" /> Register Now
                        </Link><Link to="/login" className="btn btn-warning btn-lg shadow-xl gap-2">
                                <IoIosLogIn className="text-xl" /> Log In
                            </Link></> : <div></div>}
                        <Link to="/marathons" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600 gap-2">
                            <MdEventAvailable className="text-2xl" /> Explore Events
                        </Link>

                    </div>
                </div>
            </section>
            <HeroSlider></HeroSlider>
            <SixMarathons></SixMarathons>
            <UpcomingMarathons></UpcomingMarathons>
            <QnA></QnA>
            <Chat></Chat>
        </div>
    );
};

export default Home;