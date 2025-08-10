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
import TrainingTips from '../../Components/HomeComponents/TrainingTips';
import MediaGallery from '../../Components/HomeComponents/MediaGallery';
import RunnerAchievements from '../../Components/HomeComponents/RunnerAchievements';
import SponsorShowcase from '../../Components/HomeComponents/SponsorShowcase';
import VolunteerTeam from '../../Components/HomeComponents/VolunteerTeam';




const Home = () => {
    const { user } = useContext(AuthContext);   
    useEffect(() => {
        document.title = 'RUN | Home';
    }, []);

    return (
        <div>
            
            <HeroSlider user={user}></HeroSlider>    
            <SixMarathons></SixMarathons>
            <TrainingTips></TrainingTips>
            <MediaGallery></MediaGallery>
            <VolunteerTeam></VolunteerTeam>
            <RunnerAchievements></RunnerAchievements>
            <SponsorShowcase></SponsorShowcase>
            <QnA></QnA>
            <Chat></Chat>
        </div>
    );
};

export default Home;