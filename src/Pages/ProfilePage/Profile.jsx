import React, { useEffect } from 'react';
import useGetUserData from '../../CustomHooks/useGetUserData';



const Profile = () => {
    const {data} =useGetUserData();
    console.log(data);
    
    useEffect(() => {
        document.title = 'RUN | Profile';
    }, []);
    return (
        <div className='mx-auto'>
            this is my profile page
        </div>
    );
};

export default Profile;