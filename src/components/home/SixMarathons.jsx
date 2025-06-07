import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MarathonCard from './MarathonCard';

const SixMarathons = () => {
    const [marathons, setMarathons] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/marathons-6').then(res => setMarathons(res.data)).catch(err => console.log(err));
    }, [])
    console.log(marathons);


    return (
        <div className='w-10/12 mx-auto'>

            <section className="py-12">
                <h2 className="text-2xl font-bold text-center mb-8">Featured Marathons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marathons.map((marathon) => (
                        <MarathonCard key={marathon._id} marathon={marathon} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SixMarathons;