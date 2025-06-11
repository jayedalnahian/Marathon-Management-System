import React, { useContext } from 'react';
import { FaCalendarAlt, FaFlagCheckered, FaMapMarkerAlt, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router';
import { AiFillLike } from "react-icons/ai";
import { VscGitStashApply } from "react-icons/vsc";
import { AuthContext } from '../providers/AuthContext';



const DetailsPage = () => {
    const marathonData = useLoaderData();
    const { user } = useContext(AuthContext);

    const {
        _id,
        title,
        startRegistrationDate,
        endRegistrationDate,
        marathonStartDate,
        location,
        runningDistance,
        marathonImageURL,
        description,
        totalRegistrationCount,
        createdAt,
        createdBy
    } = marathonData;

    const isRegistered = totalRegistrationCount.some(item => item.email === user?.email);



    // const handleApply = async () => {
    //     try {
    //         const response = await axios.patch(`http://localhost:3000/marathonApply/${_id}`, {
    //             $addToSet: { totalRegistrationCount: user.email }
    //         });

    //         if (response.data.modifiedCount) {
    //             alert('Successfully registered for the marathon!');
    //             window.location.reload();
    //         }
    //         else {
    //             alert('You are already registered.');
    //         }


    //     } catch (error) {
    //         console.error('Error registering for marathon:', error);
    //         alert('Failed to register for the marathon.');
    //     }
    // };
    const handleLike = () => {

    }
    const today = new Date();
    const startDate = new Date(startRegistrationDate);
    const endDate = new Date(endRegistrationDate);

    const isRegistrationOpen = today >= startDate && today <= endDate;

    return (
        <section className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
                {/* Left: Image */}
                <div className="md:w-1/2 h-64 md:h-auto">
                    <img
                        src={marathonImageURL}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right: Content */}
                <div className="md:w-1/2 p-6 space-y-4">
                    <h2 className="text-3xl font-bold text-blue-700">{title}</h2>
                    <p className="text-gray-600">{description}</p>

                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-800">
                            <FaMapMarkerAlt className="text-blue-500" />
                            <span>{location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-800">
                            <MdOutlineDateRange className="text-blue-500" />
                            <span>Registration: {startRegistrationDate} → {endRegistrationDate}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-800">
                            <FaRegCalendarAlt className="text-blue-500" />
                            <span>Marathon Date: {marathonStartDate}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-800">
                            <FaFlagCheckered className="text-blue-500" />
                            <span>Running Distance: {runningDistance}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-800">
                            <FaUser className="text-blue-500" />
                            <span>Created By: {createdBy}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-800">
                            <FaUser className="text-blue-500" />
                            <span>Total Registered: {Array.isArray(totalRegistrationCount) ? totalRegistrationCount.length : totalRegistrationCount}</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mt-4">
                        Posted on {new Date(createdAt).toLocaleDateString()}
                    </p>

                    <div className='space-x-4'>
                        <Link to={`/marathonRegister/${_id}`} className='btn btn-primary' disabled={isRegistered || !isRegistrationOpen}><VscGitStashApply /></Link>
                        <button onClick={handleLike} className='btn btn-accent'><AiFillLike /></button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsPage;