import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthProvider/AuthContext';
import { useLoaderData } from 'react-router';
import useAxiosInterceptor from '../../CustomHooks/useAxiosInterceptor';

const UpdateMarathon = () => {

    const marathonData = useLoaderData();
    const axiosInterceptor = useAxiosInterceptor()

    useEffect(() => {
        document.title = 'RUN | Update Marathon';
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
    } = marathonData;



    const handleUpdateMarathon = (e) => {
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
            axiosInterceptor.patch(`http://localhost:3000/marathon/${_id}`, data)
                .then(res => {
                    
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
                })
        } catch (error) {
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



    if (!marathonData) {
        return <div className="text-center p-6 text-gray-500">Loading marathon data...</div>;
    }
    return (
        <section className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <form noValidate onSubmit={handleUpdateMarathon} className="container flex flex-col mx-auto space-y-12">
                <div className="grid grid-cols-6  gap-4 col-span-full lg:col-span-3">
                    {[
                        { name: 'title', defaultValue: title, id: "title", label: "Marathon Title", type: "text", className: "input", col: 6 },
                        { name: 'startRegistrationDate', defaultValue: startRegistrationDate, id: "Start Registration Date", type: "date", className: "input", label: "Start Registration Date", col: 2 },
                        { name: 'endRegistrationDate', defaultValue: endRegistrationDate, id: "End Registration Date", type: "date", className: "input", label: "End Registration Date", col: 2 },
                        { name: 'marathonStartDate', defaultValue: marathonStartDate, id: "Marathon Start Date", type: "date", className: "input", label: "Marathon Start Date", col: 2 },
                        { name: 'location', defaultValue: location, id: "Location", label: "Location", className: "", type: "text", col: 3 },
                        { name: 'runningDistance', defaultValue: runningDistance, id: "Running Distance", className: "", label: "Running Distance", type: "text", col: 3 },
                        { name: 'marathonImageURL', defaultValue: marathonImageURL, id: "Marathon Image URL", className: "", label: "Marathon Image URL", type: "text", col: 6 },
                    ].map(({ id, label, type, col, name, className, defaultValue }) => (
                        <div key={id} className={`col-span-full sm:col-span-${col}`}>
                            <label htmlFor={id} className="text-sm">{label}</label>
                            <input defaultValue={defaultValue} required type={type} name={name} placeholder="Type here" className={`${className} input w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring focus:ring-violet-400 focus:outline-none`} />
                        </div>
                    ))}
                    <fieldset className="fieldset col-span-6 ">
                        <label className="text-sm">Description</label>
                        <textarea defaultValue={description} name='description' className="textarea input w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring focus:ring-violet-400 focus:outline-none" placeholder="Description"></textarea>
                    </fieldset>
                    <button type='submit' className='btn btn-primary col-span-6'>Update Marathon</button>
                </div>
            </form>
        </section>

    );
};
export default UpdateMarathon;