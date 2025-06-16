import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Chat = () => {

    const [opinions, setOpinions] = useState([])

    useEffect(() => {
        try {
            axios.get(`https://b11a11-server-side-jayedalnahian.vercel.app/opinion`).then(res => setOpinions(res.data));
        }
        catch (error) {
            console.log(error)
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
    }, [])

    console.log(opinions);


    const handleChat = (e) => {

        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const opinion = e.target.opinion.value;
        const opinionData = { name, opinion, email}

        try {
            axios.post(`https://b11a11-server-side-jayedalnahian.vercel.app/opinion`, opinionData)
                .then(data => {
                    if (data?.data?.insertedId) {
                        setOpinions(prev => [...prev, opinionData]);
                        Swal.fire({
                            title: "Comment Successfuly Submitted!",
                            text: "",
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
                        e.target.reset()

                    }
                })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Submition Failed!",
                text: "Try Again",
                icon: "error",
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

    }


    return (
        <div className=' w-10/12 mx-auto my-10'>
            <p className='text-3xl font-bold text-center my-10 mt-20'>Questions and Answers</p>
            <div>
                <form onSubmit={(e) => handleChat(e)} className="fieldset bg-base-200 border-base-300 rounded-box border p-4 ">


                    <label className="label">Your Name</label>
                    <input type="text" name='name' className="input w-full" placeholder="Name" />
                    <label className="label">Email</label>
                    <input type="email" name='email' className="input w-full" placeholder="Email" />

                    <label className="label w-full">What are your feelings about this website?</label>
                    <textarea name='opinion' className="textarea  w-full" placeholder="Opinions"></textarea>

                    <button type='submit' className="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
            <div className='bg-gray-500 border-base-100 rounded-box border p-4 mt-10'>
                {
                    opinions.map(opinion => <div className="chat chat-start mt-10 flex items-center">
                        <div className="avatar avatar-placeholder">
                            <div title={opinion.name} className="bg-neutral text-neutral-content w-12 rounded-full">
                                <span>{opinion.name[0]}{opinion.name[1]}</span>
                            </div>
                        </div>
                        <div title={opinion.name} className="chat-bubble shadow-black border-base-400 shadow-2xl">{opinion.opinion}</div>
                    </div>)
                }
            </div>

        </div>

    );
};

export default Chat;