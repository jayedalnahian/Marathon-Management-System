import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthContext';
import Loading from './Loading';
import { Link } from 'react-router';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { FaSearch } from 'react-icons/fa';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';

const MyAppliedMarathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [applicantData, setApplicantData] = useState(null);
    const [searchModal, setSearchModal] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const axiosInterceptor = useAxiosInterceptor()

    useEffect(() => {
        if (!user.email) return;

        const fetchMarathons = async () => {
            try {
                const response = await axiosInterceptor.get(`/my-applied-marathons/${user.email}`);
                setMarathons(response.data);
            } catch (error) {
                console.error('Error fetching marathons:', error);
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
                setLoading(false);
            }
        };

        fetchMarathons();
    }, [user.email, axiosInterceptor]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";

        const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'long' };
        const date = new Date(dateString);
        return {
            formattedDate: date.toLocaleDateString(undefined, options),
            dayName: date.toLocaleDateString(undefined, { weekday: 'long' })
        };
    };


    if (loading) {
        return (
            <Loading></Loading>
        )
    }


    const handleCancel = async (marathonId) => {
        const accessToken = user.accessToken;
        const confirm = await Swal.fire({
            title: "Are you sure you want to cancel your registration?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it",
            background: "linear-gradient(135deg, #7f00ff, #00bfff)",
            color: "#ffffff",
            customClass: {
                popup: 'rounded-xl shadow-xl',
                title: 'text-2xl font-bold',
            },
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosInterceptor.patch(`/cancel-registration/${marathonId}`, {
                    userId: user.uid,
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                
                window.location.reload();

                if (res.data.modifiedCount === 1) {

                    // ekhane registered user er data delete kora hoyeche
                    const updatedMarathons = marathons.map(marathon => {
                        if (marathon._id === marathonId) {
                            return {
                                ...marathon,
                                totalRegistrationCount: marathon.totalRegistrationCount.filter(reg => reg.userId !== user.uid)
                            };
                        }
                        return marathon;
                    }).filter(marathon => marathon.totalRegistrationCount.length > 0);

                    setMarathons(updatedMarathons);

                    Swal.fire({
                        title: "Registration canceled successfully!",
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        icon: "success",
                        background: "linear-gradient(135deg, #7f00ff, #00bfff)",
                        color: "#ffffff",
                        customClass: {
                            popup: 'rounded-xl shadow-xl',
                            title: 'text-2xl font-bold',
                        }
                    });
                }
            } catch (error) {
                console.error("Error canceling registration:", error);
                Swal.fire({
                    title: "Failed to cancel registration",
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false,
                    background: "linear-gradient(135deg, #7f00ff, #00bfff)",
                    color: "#ffffff",
                    customClass: {
                        popup: 'rounded-xl shadow-xl',
                        title: 'text-2xl font-bold',
                    }
                });
            }
        }
    };



    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const updatedData = {
            marathonId: data.marathonId,
            userId: data.userId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            emergencyContact: data.emergencyContact
        };

        try {
            const response = await axiosInterceptor.patch(
                `/update-registration/${data.marathonId}`,
                {
                    userId: data.userId,
                    updatedData: updatedData
                }
            );

            if (response.data.modifiedCount === 1) {
                // Update local state to reflect changes
                const updatedMarathons = marathons.map(marathon => {
                    if (marathon._id === data.marathonId) {
                        return {
                            ...marathon,
                            totalRegistrationCount: marathon.totalRegistrationCount.map(reg => {
                                if (reg.userId === data.userId) {
                                    return updatedData;
                                }
                                return reg;
                            })
                        };
                    }
                    return marathon;
                });

                setMarathons(updatedMarathons);
                setShowModal(false);

                Swal.fire({
                    title: "Registration updated successfully!",
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
            }
        } catch (error) {
            console.error('Error updating registration:', error);

            Swal.fire({
                title: "Failed to update registration",
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
    };


    const handleSearch = (e) => {
        e.preventDefault();

        const searchInput = e.target.search.value.trim().toLowerCase();
        if (!searchInput) return;

        setSearchModal(true);

        const matchedMarathons = marathons.filter((marathon) => {
            const title = marathon.title?.trim().toLowerCase();
            return title.includes(searchInput);
        });

        setSearchResult(matchedMarathons);
        e.target.reset();
    };



    const handleData = (dataArray) => {
        setShowModal(true);
        const currentUserEmail = user.email;
        const currentUserApplyData = dataArray.find(entry => entry.email === currentUserEmail);
        setApplicantData(currentUserApplyData);

    }

    return (
        <div className=" p-2 mx-auto sm:p-4 dark:text-gray-800 ">

            <div className="overflow-x-auto ">
                <div className='flex justify-center items-center p-5'>
                    <form onSubmit={(e) => handleSearch(e)} action="">
                        <div className="join min-w-2xl">
                            <input
                                placeholder='Search By Marathon Title'
                                type="text"
                                name="search"
                                className="w-full p-2 border rounded bg-gray-400"
                            />
                            <button type='submit' className="btn btn-error join-item rounded-r-full"><FaSearch />Search</button>
                            {searchModal && (
                                <div className="fixed inset-0 bg-[#80808080] z-50 flex justify-center items-center">
                                    <section className="w-11/12 max-w-4xl max-h-screen overflow-y-auto bg-white p-5 text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
                                        <div className='flex justify-between items-center'>
                                            <div></div>
                                            <div></div>
                                            <button className="btn btn-error btn-sm rounded text-white" onClick={() => setSearchModal(false)}>✕</button>
                                        </div>

                                        <div>
                                            {searchResult.length !== 0 ? searchResult.map(marathon => <div key={marathon._id} >
                                                <div className=" mt-5 rounded-lg overflow-hidden  bg-gray-950/80 shadow-2xl">
                                                    <img src={marathon.marathonImageURL} alt={marathon.title} className="w-full h-48 object-cover" />
                                                    <div className="p-4">
                                                        <h3 className="font-bold text-xl">{marathon.title}</h3>
                                                        <p>{marathon.location}</p>
                                                        <p>Dates: {marathon.startRegistrationDate} to {marathon.endRegistrationDate}</p>
                                                        <Link
                                                            to={`/details/${marathon._id}`}

                                                            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                                                        >
                                                            See Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>) : <p>Sorry we can't find anything.</p>}
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
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
                        {marathons.map((marathon, index) => {
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
                                    <td className="p-3 flex flex-col md:flex-row justify-center items-center gap-5 ">

                                        <button onClick={() => handleData(marathon.totalRegistrationCount)} className='btn btn-primary btn-sm'>Update</button>
                                        {
                                            showModal && (
                                                <div className="fixed inset-0 bg-[#80808080] z-50 flex justify-center items-center">
                                                    <section className="w-11/12 max-w-4xl max-h-screen overflow-y-auto bg-white p-5 text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
                                                        <div className='flex justify-between items-center'>
                                                            <div></div>
                                                            <div></div>
                                                            <button className=" text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded" onClick={() => setShowModal(false)}>✕</button>
                                                        </div>

                                                        <div>
                                                            <h1 className="text-xl font-bold mb-6">Update Registration for: {marathon.title}</h1>

                                                            <div className="mb-6 p-6 border rounded-2xl shadow-lg bg-white dark:bg-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
                                                                <div className="w-full md:w-1/3 text-center">
                                                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">🏁 Marathon Details</h2>
                                                                </div>

                                                                <div className="w-full md:w-2/3 grid grid-cols-2 gap-x-4 gap-y-2 text-left">
                                                                    <p className="text-gray-500 dark:text-gray-300 font-medium">📍 Location:</p>
                                                                    <p className="text-gray-800 dark:text-white text-lg font-semibold">{marathon.location}</p>

                                                                    <p className="text-gray-500 dark:text-gray-300 font-medium">📅 Start Date:</p>
                                                                    <p className="text-gray-800 dark:text-white text-lg font-semibold">
                                                                        {new Date(marathon.marathonStartDate).toLocaleDateString(undefined, {
                                                                            weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
                                                                        })}
                                                                    </p>

                                                                    <p className="text-gray-500 dark:text-gray-300 font-medium">🏃 Distance:</p>
                                                                    <p className="text-gray-800 dark:text-white text-lg font-semibold">{marathon.runningDistance}</p>
                                                                </div>
                                                            </div>


                                                            <form className='border p-4 rounded' onSubmit={(e) => handleUpdate(e)}>
                                                                <div className="space-y-4">
                                                                    <input type="hidden" name="marathonId" value={marathon._id} />
                                                                    <input type="hidden" name="userId" value={user?.uid} />

                                                                    <div>
                                                                        <label className="block mb-1">Email*</label>
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            defaultValue={applicantData.email}
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
                                                                                defaultValue={applicantData.firstName}
                                                                                className="w-full p-2 border rounded"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block mb-1">Last Name*</label>
                                                                            <input
                                                                                type="text"
                                                                                name="lastName"
                                                                                defaultValue={applicantData.lastName}
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
                                                                            defaultValue={applicantData.phone}
                                                                            required
                                                                            className="w-full p-2 border rounded"
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <label className="block mb-1">Emergency Contact</label>
                                                                        <input
                                                                            type="text"
                                                                            name="emergencyContact"
                                                                            defaultValue={applicantData.emergencyContact}
                                                                            className="w-full p-2 border rounded"
                                                                        />
                                                                    </div>

                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-primary hover:bg-blue-700"
                                                                    >
                                                                        Update Registration
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </section>
                                                </div>
                                            )
                                        }

                                        <button className='btn btn-sm btn-active'><Link to={`/details/${marathon._id}`}>Details</Link></button>
                                        <button onClick={() => handleCancel(marathon._id)} className='btn btn-sm btn-error'>Cancel</button>

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

export default MyAppliedMarathons;
