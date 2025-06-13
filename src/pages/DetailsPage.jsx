import React, { useContext, useEffect } from 'react';
import { FaCalendarAlt, FaFlagCheckered, FaMapMarkerAlt, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router';
import { AiFillLike } from "react-icons/ai";
import { VscGitStashApply } from "react-icons/vsc";
import { AuthContext } from '../providers/AuthContext';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


const DetailsPage = () => {
    const marathonData = useLoaderData();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'RUN | Details';
    }, []);

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
        createdBy
    } = marathonData;

    const isRegistered = totalRegistrationCount.some(item => item.email === user?.email);



    // const today = new Date();
    // const startDate = new Date(startRegistrationDate);
    // const endDate = new Date(endRegistrationDate);

    const isRegistrationOpen = true; //today >= startDate && today <= endDate;

    return (
        <section className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white shadow-xl border border-gray-600/70 rounded-lg overflow-hidden md:flex">

                <div className="md:w-1/2 h-64 md:h-auto">
                    <img
                        src={marathonImageURL}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="md:w-1/2 p-6 space-y-4 flex justify-center items-center flex-col">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-700">{title}</h2>
                        <p className="text-gray-600">{description}</p>
                    </div>

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

                    <div className="mt-4 text-center">
                        <h3 className="text-lg font-semibold mb-2 text-blue-600">Marathon is going <br /> to start in</h3>
                        <CountdownCircleTimer
                            isPlaying
                            size={120}
                            strokeWidth={10}
                            duration={Math.max(0, Math.floor((new Date(marathonStartDate).getTime() - Date.now()) / 1000))}
                            colors={["#00b894", "#fdcb6e", "#e17055", "#d63031"]}
                            colorsTime={[60 * 60 * 24, 60 * 60, 60, 0]}
                            onComplete={() => ({ shouldRepeat: false })}
                        >
                            {({ remainingTime }) => {
                                if (remainingTime <= 0) return <span className="text-red-500">Started</span>;

                                const days = Math.floor(remainingTime / (60 * 60 * 24));
                                const hours = Math.floor((remainingTime % (60 * 60 * 24)) / 3600);
                                const minutes = Math.floor((remainingTime % 3600) / 60);
                                const seconds = remainingTime % 60;

                                return (
                                    <div className="text-sm">
                                        <div className="font-bold text-lg text-black">{days}d {hours}h</div>
                                        <div className='text-black'>{minutes}m {seconds}s</div>
                                    </div>
                                );
                            }}
                        </CountdownCircleTimer>
                    </div>

                    <div className='space-x-4'>
                        <Link to={`/marathonRegister/${_id}`} className='btn btn-primary' disabled={isRegistered || !isRegistrationOpen}><VscGitStashApply /></Link>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsPage;