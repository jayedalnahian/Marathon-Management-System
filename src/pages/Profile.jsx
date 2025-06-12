import React, { useEffect } from 'react';

const Profile = () => {
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