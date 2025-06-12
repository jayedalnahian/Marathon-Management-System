import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MarathonCard from '../components/home/MarathonCard';
import Loading from './Loading';
import Swal from 'sweetalert2';


const Marathons = () => {
    const [marathons, setMarathons] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMarathons = () => {
            try {
                axios.get('http://localhost:3000/marathons')
                    .then(res => setMarathons(res.data))

            }
            catch (err) {
                console.error("Failed to fetch marathons:", err);
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
            finally {
                setLoading(false)
            }
        }

        fetchMarathons()
    }, [])

    if (loading) {
        return (
            <Loading></Loading>
        )
    }
    return (

        <div className='w-10/12 mx-auto bg-[url(https://i.ibb.co/S4PBtFcF/Bucharest-Marathon-scaled.jpg)] bg-cover px-10 rounded-2xl py-10'>
            <div className='bg-gray-950/70 py-10 px-10 rounded-2xl shadow-2xl'>
                <section className="text-white">
                    <h2 className="text-2xl font-bold text-center mb-8">Featured Marathons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {marathons.map((marathon) => (
                            <MarathonCard key={marathon._id} marathon={marathon} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Marathons;