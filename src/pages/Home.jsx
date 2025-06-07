import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import SixMarathons from '../components/home/SixMarathons';
import UpcomingMarathons from '../components/home/UpcomingMarathons';
import QnA from '../components/home/QnA';
import Chat from '../components/home/Chat';


const Home = () => {

    return (
        <div>
            <HeroSlider></HeroSlider>
            <SixMarathons></SixMarathons>
            <UpcomingMarathons></UpcomingMarathons>
            <QnA></QnA>
            <Chat></Chat>
        </div>
    );
};

export default Home;