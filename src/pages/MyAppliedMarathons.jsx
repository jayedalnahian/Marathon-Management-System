import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthContext';
import Loading from './Loading';
import { Link } from 'react-router';

const MyAppliedMarathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user.email) return;

        const fetchMarathons = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/my-applied-marathons/${user.email}`);
                setMarathons(response.data);
            } catch (error) {
                console.error('Error fetching marathons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarathons();
    }, [user.email]);

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
                                        <button className='btn btn-sm btn-active'><Link to={`/details/${marathon._id}`}>Details</Link></button>

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
