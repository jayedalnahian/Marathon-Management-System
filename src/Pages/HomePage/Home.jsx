import React, { useContext, useEffect } from 'react';
import HeroSlider from '../../Components/HomeComponents/HeroSlider';
import SixMarathons from '../../Components/HomeComponents/SixMarathons';
import UpcomingMarathons from '../../Components/HomeComponents/UpcomingMarathons';
import QnA from '../../Components/HomeComponents/QnA';
import Chat from '../../Components/HomeComponents/Chat';
import { FaRunning } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { Link } from 'react-router';
import { AuthContext } from '../../AuthProvider/AuthContext';



const Home = () => {
    const { user } = useContext(AuthContext);   
    useEffect(() => {
        document.title = 'RUN | Home';
    }, []);

    return (
        <div>
            
            <HeroSlider user={user}></HeroSlider>
            <SixMarathons></SixMarathons>
            <UpcomingMarathons></UpcomingMarathons>
            <QnA></QnA>
            <Chat></Chat>
        </div>
    );
};

export default Home;