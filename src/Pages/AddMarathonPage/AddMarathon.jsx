import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthContextt';

import Swal from 'sweetalert2';
import useAxiosInterceptor from '../../CustomHooks/useAxiosInterceptor';


const AddMarathon = () => {
    const { user } = useContext(AuthContext);
    const axiosInterceptor = useAxiosInterceptor()

    const handleAddMarathon = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const startRegistrationDate = e.target.startRegistrationDate.value;
        const endRegistrationDate = e.target.endRegistrationDate.value;
        const marathonStartDate = e.target.marathonStartDate.value;
        const location = e.target.location.value;
        const runningDistance = e.target.runningDistance.value;
        const marathonImageURL = e.target.marathonImageURL.value;
        const description = e.target.description.value;
        const totalRegistrationCount = [];
        const createdAt = new Date();
        const createdBy = user?.email;


        const data = {
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
        }



        try {
            axiosInterceptor.post("/marathons", data)
                .then(data => {

                    if (data?.data?.insertedId) {
                        Swal.fire({
                            title: "🎉 Marathon Posted!",
                            text: "Your marathon has been successfully added.",
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


                    }
                })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Sorry, something went wrong",
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
        <section className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <form noValidate onSubmit={handleAddMarathon} className="container flex flex-col mx-auto space-y-12">
                <div className="grid grid-cols-6  gap-4 col-span-full lg:col-span-3">
                    {[
                        { name: 'title', id: "title", label: "Marathon Title", type: "text", className: "input", col: 6 },
                        { name: 'startRegistrationDate', id: "Start Registration Date", type: "date", className: "input", label: "Start Registration Date", col: 2 },
                        { name: 'endRegistrationDate', id: "End Registration Date", type: "date", className: "input", label: "End Registration Date", col: 2 },
                        { name: 'marathonStartDate', id: "Marathon Start Date", type: "date", className: "input", label: "Marathon Start Date", col: 2 },
                        { name: 'location', id: "Location", label: "Location", className: "", type: "text", col: 3 },
                        // { name: 'runningDistance', id: "Running Distance", className: "", label: "Running Distance", type: "text", col: 3 },
                        { name: 'marathonImageURL', id: "Marathon Image URL", className: "", label: "Marathon Image URL", type: "text", col: 6 },
                    ].map(({ id, label, type, col, name, className }) => (
                        <div key={id} className={`col-span-full sm:col-span-${col}`}>
                            <label htmlFor={id} className="text-sm">{label}</label>
                            <input required type={type} name={name} placeholder="Type here" className={`${className} input w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring focus:ring-violet-400 focus:outline-none`} />
                        </div>
                    ))}
                    <select name="runningDistance" className="col-span-6 input w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring hover:ring-violet-400 focus:outline-none" required>
                        <option value="" className=''>Select Running Distance</option>
                        <option value="3KM">3 KM</option>
                        <option value="10 KM">10 KM</option>
                        <option value="25 KM">25 KM</option>

                    </select>
                    <fieldset className="fieldset col-span-6 ">
                        <label className="text-sm">Description</label>
                        <textarea name='description' className="textarea input w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring focus:ring-violet-400 focus:outline-none" placeholder="Description"></textarea>
                    </fieldset>
                    <button type='submit' className='btn btn-primary col-span-6'>Add Marathon</button>
                </div>
            </form>
        </section>

    );
};

export default AddMarathon;
