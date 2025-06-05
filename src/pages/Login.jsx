import React from 'react';
import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../providers/AuthContext';
import Swal from 'sweetalert2';


const Login = () => {
    const navigate = useNavigate();

    const {
        loginUser,
        googleLogin
    } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e?.target?.email?.value;
        const password = e?.target?.password?.value;
        const userData = {
            email, password
        }
        console.log(userData);
        loginUser(email, password)
            .then((userCredential) => {
                const user = userCredential?.user;
                console.log(user);
                if (user.accessToken) {
                    Swal.fire({
                        title: "Login Successful!",
                        timer:3000,
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
                navigate("/")


            })
            .catch((error) => {
                const errorCode = error;
                console.log(errorCode);
                Swal.fire({
                    title: "Login Faild!",
                    text: "Try again",
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
                e.target.reset();

            });
    }


    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                console.log(res.user)
                if (res.user.accessToken) {
                    Swal.fire({
                        title: "Login Successful!",
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
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Login Failed!",
                    text: `${err.message}`,
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
            )
    }

    return (
        <div className="w-full mx-auto max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800 border">
            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
            <p className="text-sm text-center dark:text-gray-600">Dont have account?
                <Link to='/register' href="#" rel="noopener noreferrer" className="focus:underline hover:underline">Register here</Link>
            </p>
            <div className="my-6 space-y-4">
                <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                    <FcGoogle size={30} />
                    <p>Login with Google</p>
                </button>
            </div>
            <div className="flex items-center w-full my-4">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3 dark:text-gray-600">OR</p>
                <hr className="w-full dark:text-gray-600" />
            </div>
            <form onSubmit={handleLogin} noValidate="" action="" className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm">Email address</label>
                        <input required type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
                        </div>
                        <input required type="password" name="password" id="password" placeholder="********" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                </div>
                <button type="submit" className="btn w-full text-xl font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Login</button>
            </form>
        </div>
    );
};

export default Login;