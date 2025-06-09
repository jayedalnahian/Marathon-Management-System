import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthContext';
import { GrUpdate } from "react-icons/gr";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { Link} from 'react-router';
import Loading from './Loading';

const MyMarathonList = () => {

    const { user, loading, setLoading} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/created-by/${user.email}`);
                console.log("Fetched data:", res.data);
                setUserData(res.data);
                setLoading(false)
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
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

    if(loading){
        return(
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
                            <th className="p-3">Marathon Start Date</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((marathon, index) => {
                            const { formattedDate, dayName } = formatDate(marathon.marathonStartDate);

                            return (
                                <tr key={marathon._id} className="border-b text-center border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3">
                                        <p>{index + 1}</p>  {/* Use map's index parameter instead of indexOf */}
                                    </td>
                                    <td className="p-3">
                                        <p>{marathon.title}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{formattedDate}</p>
                                        <p className="dark:text-gray-600">{dayName}</p>
                                    </td>
                                    <td className="p-3 flex flex-col md:flex-row justify-center items-center gap-5 ">
                                        <button className='btn btn-primary' title='Update'>
                                            <Link to={`http://localhost:5173/updateMarathon/${marathon._id}`}><GrUpdate size={15} /></Link>
                                        </button>
                                        <button className='btn btn-error' title='Delete'>
                                            <MdDelete size={20} />
                                        </button>
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