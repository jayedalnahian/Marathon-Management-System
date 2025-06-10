import React from 'react';
import { Link } from 'react-router';

const MarathonCard = ({ marathon }) => {
    return (
        <div className=" rounded-lg overflow-hidden  bg-gray-950/80 shadow-2xl">
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
    );
};

export default MarathonCard;