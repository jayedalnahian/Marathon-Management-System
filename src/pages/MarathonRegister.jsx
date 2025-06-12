import React, { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../providers/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const MarathonRegister = () => {
    const marathonData = useLoaderData();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
            document.title = 'RUN | Marathon Registration';
        }, []);

    const {
        _id,
        title,
        marathonStartDate,
        location,
        runningDistance,
    } = marathonData;


    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        try {
            let priRegistration = JSON.parse(localStorage.getItem("myRegisteredMarathons")) || [];

            if (!priRegistration.includes(_id)) {
                priRegistration.push(_id);
                localStorage.setItem("myRegisteredMarathons", JSON.stringify(priRegistration));
            }

            const response = await axios.patch(`http://localhost:3000/marathonApply/${_id}`, {
                $addToSet: { totalRegistrationCount: data }
            });

            if (response.data.modifiedCount) {
                navigate('/dashboard')
                Swal.fire({
                    title: "Successfully registered for the marathon!",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: "linear-gradient(135deg, #7f00ff, #00bfff)", // vibrant purple to blue
                    color: "#ffffff", // white text
                    customClass: {
                        popup: 'rounded-xl shadow-xl',
                        title: 'text-2xl font-bold',
                        icon: 'mt-3',
                    },
                    icon: "success",

                });
            } else {
              
                Swal.fire({
                    title: "You are already registered.",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: "linear-gradient(135deg, #7f00ff, #00bfff)", // vibrant purple to blue
                    color: "#ffffff", // white text
                    customClass: {
                        popup: 'rounded-xl shadow-xl',
                        title: 'text-2xl font-bold',
                        icon: 'mt-3',
                    },
                    icon: "error",

                });
            }
        }
        catch (error) {
            console.error('Error registering for marathon:', error);
            Swal.fire({
                    title: "Failed to register for the marathon.",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: "linear-gradient(135deg, #7f00ff, #00bfff)", // vibrant purple to blue
                    color: "#ffffff", // white text
                    customClass: {
                        popup: 'rounded-xl shadow-xl',
                        title: 'text-2xl font-bold',
                        icon: 'mt-3',
                    },
                    icon: "error",

                });
        }
    }
    return (

        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Register for {title}</h1>

            <div className="mb-6 p-4 border rounded-lg ">
                <h2 className="font-semibold ">Event Details</h2>
                <p>{location}</p>
                <p>{new Date(marathonStartDate).toLocaleDateString()}</p>
                <p>Distance: {runningDistance}</p>
            </div>

            <form onSubmit={handleRegister} className='border p-4 rounded'>
                <div className="space-y-4">
                    <input type="hidden" name="marathonId" value={_id} />
                    <input type="hidden" name="userId" value={user?.uid} />

                    <div>
                        <label className="block mb-1">Email*</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={user?.email || ""}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">First Name*</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Last Name*</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1">Phone Number*</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Emergency Contact</label>
                        <input
                            type="text"
                            name="emergencyContact"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary hover:bg-blue-700"
                    >
                        Complete Registration
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MarathonRegister;