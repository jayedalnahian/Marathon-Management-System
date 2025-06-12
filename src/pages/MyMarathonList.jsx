import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthContext';
import { GrUpdate } from "react-icons/gr";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';
import Loading from './Loading';
import Swal from 'sweetalert2';

const MyMarathonList = () => {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [applicantModal, setApplicantModal] = useState(false);


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/marathon/${id}`)
                    .then(res => {
                        if (res.data.deletedCount === 1) {
                            // Remove deleted item from UI
                            setUserData(prevData => prevData.filter(item => item._id !== id));

                            Swal.fire(
                                'Deleted!',
                                'The marathon has been deleted.',
                                'success'
                            );
                        } else {
                            Swal.fire('Error', 'Could not delete the marathon.', 'error');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire('Error', 'Something went wrong!', 'error');
                    });
            }
        });
    };



    useEffect(() => {
        if (!user.email) return;
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/created-by/${user.email}`);

                setUserData(res.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                Swal.fire({
                    title: "Unexpected Error!",
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

            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [user.email, setUserData]);





    const formatDate = (dateString) => {
        if (!dateString) return "N/A";

        const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'long' };
        const date = new Date(dateString);
        return {
            formattedDate: date.toLocaleDateString(undefined, options),
            dayName: date.toLocaleDateString(undefined, { weekday: 'long' })
        };
    };

    const handleUpdateMarathon = (e, id) => {
        e.preventDefault();
        const title = e.target.title.value;
        const startRegistrationDate = e.target.startRegistrationDate.value;
        const endRegistrationDate = e.target.endRegistrationDate.value;
        const marathonStartDate = e.target.marathonStartDate.value;
        const location = e.target.location.value;
        const runningDistance = e.target.runningDistance.value;
        const marathonImageURL = e.target.marathonImageURL.value;
        const description = e.target.description.value;




        const data = {
            title,
            startRegistrationDate,
            endRegistrationDate,
            marathonStartDate,
            location,
            runningDistance,
            marathonImageURL,
            description,


        }


        try {
            axios.patch(`http://localhost:3000/marathon/${id}`, data)
                .then(res => {
                    console.log(res)
                    Swal.fire({
                        title: "🎉 Marathon Updated!",
                        text: "Your marathon has been successfully updated.",
                        icon: "success",
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
                    });
                    setUserData(prev =>
                        prev.map(marathon =>
                            marathon._id === id ? { ...marathon, ...data } : marathon
                        )
                    );
                    setShowModal(false);
                })

        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: "Unexpected Error!",
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


    if (loading) {
        return (
            <Loading></Loading>
        )
    }

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead className="dark:bg-gray-300">
                        <tr className="text-center">
                            <th className="p-3">No.</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Marathon Start Date</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((marathon, index) => {
                            const { formattedDate } = formatDate(marathon.marathonStartDate);

                            return (
                                <tr key={marathon._id} className="border-b text-center border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3">
                                        <p>{index + 1}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{marathon.title}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{marathon.location}</p>
                                        
                                    </td>
                                    <td className="p-3">
                                        <p>{formattedDate}</p>

                                    </td>
                                    <td className="p-3 flex flex-col md:flex-row justify-center items-center gap-2 ">
                                        <button className='btn btn-sm btn-active'><Link to={`/details/${marathon._id}`}>Details</Link></button>
                                        <button onClick={() => setApplicantModal(true)} className='btn btn-sm btn-primary'>Applicants</button>
                                        {
                                            applicantModal && (
                                                <div className="fixed inset-0 bg-[#80808080] z-50 flex justify-center items-center">
                                                    <section className="w-11/12 max-w-4xl max-h-screen overflow-y-auto bg-white p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg relative">
                                                        <button className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded" onClick={() => setApplicantModal(false)}>✕</button>

                                                        <h2 className="text-2xl font-bold mb-4">Applicants</h2>

                                                        {marathon?.totalRegistrationCount?.length === 0 ? (
                                                            <p className="text-gray-500">No applicants registered yet.</p>
                                                        ) : (
                                                            <div className="space-y-4">
                                                                {marathon.totalRegistrationCount.map((reg, index) => (
                                                                    <div
                                                                        key={reg.userId}
                                                                        className="border p-4 rounded-md bg-gray-100 dark:bg-gray-800"
                                                                    >
                                                                        <p className="text-lg font-semibold">
                                                                            {index + 1}. {reg.firstName} {reg.lastName}
                                                                        </p>
                                                                        <p><span className="font-medium">Email:</span> {reg.email}</p>
                                                                        <p><span className="font-medium">Phone:</span> {reg.phone}</p>
                                                                        <p>
                                                                            <span className="font-medium">Emergency Contact:</span>{" "}
                                                                            {reg.emergencyContact}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </section>
                                                </div>

                                            )}
                                        <button onClick={() => setShowModal(true)} className='btn btn-sm btn-primary' title='Update'>Update</button>

                                        {
                                            showModal && (
                                                <div className="fixed inset-0 bg-[#80808080] z-50 flex justify-center items-center">


                                                    <section className="w-11/12 max-w-4xl max-h-screen overflow-y-auto bg-white p-5 text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg">


                                                        <form noValidate onSubmit={(e) => handleUpdateMarathon(e, marathon._id)} className="mx-auto space-y-12">
                                                            <div className='flex justify-between items-center'>
                                                                <div></div>
                                                                <p className='text-2xl font-bold'>Update Marathon</p>
                                                                <button className=" text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded" onClick={() => setShowModal(false)}>✕</button>
                                                            </div>
                                                            <div className="grid grid-cols-6  gap-4 col-span-full lg:col-span-3">
                                                                {[
                                                                    { name: 'title', defaultValue: marathon.title, id: "title", label: "Marathon Title", type: "text", className: "input", col: 6 },
                                                                    { name: 'startRegistrationDate', defaultValue: marathon.startRegistrationDate, id: "Start Registration Date", type: "date", className: "input", label: "Start Registration Date", col: 2 },
                                                                    { name: 'endRegistrationDate', defaultValue: marathon.endRegistrationDate, id: "End Registration Date", type: "date", className: "input", label: "End Registration Date", col: 2 },
                                                                    { name: 'marathonStartDate', defaultValue: marathon.marathonStartDate, id: "Marathon Start Date", type: "date", className: "input", label: "Marathon Start Date", col: 2 },
                                                                    { name: 'location', defaultValue: marathon.location, id: "Location", label: "Location", className: "", type: "text", col: 3 },
                                                                    { name: 'runningDistance', defaultValue: marathon.runningDistance, id: "Running Distance", className: "", label: "Running Distance", type: "text", col: 3 },
                                                                    { name: 'marathonImageURL', defaultValue: marathon.marathonImageURL, id: "Marathon Image URL", className: "", label: "Marathon Image URL", type: "text", col: 6 },
                                                                ].map(({ id, label, type, col, name, className, defaultValue }) => (
                                                                    <div key={id} className={`col-span-full sm:col-span-${col}`}>
                                                                        <label htmlFor={id} className="text-sm">{label}</label>
                                                                        <input defaultValue={defaultValue} required type={type} name={name} placeholder="Type here" className={`${className} input w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring focus:ring-violet-400 focus:outline-none`} />
                                                                    </div>
                                                                ))}
                                                                <fieldset className="fieldset col-span-6 ">
                                                                    <label className="text-sm">Description</label>
                                                                    <textarea defaultValue={marathon.description} name='description' className="textarea input w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring focus:ring-violet-400 focus:outline-none" placeholder="Description"></textarea>
                                                                </fieldset>
                                                                <button type='submit' className='btn btn-primary col-span-6'>Update Marathon</button>
                                                            </div>
                                                        </form>
                                                    </section>
                                                </div>


                                            )
                                        }

                                        <button onClick={() => handleDelete(marathon._id)} className='btn btn-sm btn-error' title='Delete'><MdDelete size={20} /></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMarathonList;