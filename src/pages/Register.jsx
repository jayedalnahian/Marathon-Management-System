import React, { useContext, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../providers/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
    const { registerUser } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'RUN | Registration';
    }, []);

    const navigate = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault();
        
        const name = e?.target?.name?.value;
        const email = e?.target?.email?.value;
        const photo = e?.target?.photo?.value;
        const password = e?.target?.password?.value;
        const userData = {
            name, email, photo, password
        }
        registerUser(email, password)
            .then(res => {

                if (res?.user) {


                    try {
                        axios.post('http://localhost:3000/users', userData)
                            .then(data => {
                                if (data?.data?.insertedId) {
                                    Swal.fire({
                                        title: "Registration Successful!",
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
                                    navigate('/')
                                }
                            })
                    } catch (error) {
                        console.log(error)
                        Swal.fire({
                            title: "Registration Failed!",
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

            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Registration Failed!",
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

            })

    }
    return (
        <div className="w-10/12 mx-auto max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800 border">
            <h2 className="mb-3 text-3xl font-semibold text-center">Register</h2>
            <p className="text-sm text-center dark:text-gray-600">Already have an account?
                <Link to='/login' href="#" rel="noopener noreferrer" className="focus:underline hover:underline">Login here</Link>
            </p>

            <div className="flex items-center w-full my-4">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3 dark:text-gray-600">OR</p>
                <hr className="w-full dark:text-gray-600" />
            </div>
            <form onSubmit={handleRegister} noValidate="" action="" className="space-y-8">
                <div className="space-y-4">
                    {/* name  */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm">Your Full Name</label>
                        <input required type="text" name="name" id="" placeholder="Name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    {/* email  */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm">Your Email address</label>
                        <input required type="email" name="email" id="email" placeholder="Email Address" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    {/* photo url  */}
                    <div className="space-y-2">
                        <label htmlFor="photo" className="block text-sm">Your Photo URL</label>
                        <input required type="text" name="Photo" id="photo" placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    {/* password */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm">Password</label>
                        <label className="input validator w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600">
                            <input
                                type="password"
                                name='password'
                                required
                                placeholder="Password"
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 8 characters, including
                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                    </div>
                </div>
                <button type="submit" className="btn w-full text-xl font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Register</button>
            </form>
        </div>
    );
};

export default Register;