import React, { useEffect } from 'react';
import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthProvider/AuthContext';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'RUN | Login';
    }, []);

    const { loginUser, googleLogin } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        loginUser(email, password)
            .then((userCredential) => {
                const user = userCredential?.user;

                if (user.accessToken) {
                    showSuccessAlert("Login Successful!");
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log(error);
                showErrorAlert("Login Failed!", "Try again");
                e.target.reset();
            });
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                if (res.user.accessToken) {
                    showSuccessAlert("Login Successful!");
                    navigate("/");
                }
            })
            .catch(err => {
                console.log(err);
                showErrorAlert("Login Failed!", err.message);
            });
    }

    const showSuccessAlert = (title) => {
        Swal.fire({
            title: title,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: "#F2EFE7",
            color: "#006A71",
            icon: "success",
            customClass: {
                popup: 'rounded-xl shadow-xl border border-secondary',
                title: 'text-2xl font-bold',
                icon: 'mt-3 text-primary',
            },
        });
    }

    const showErrorAlert = (title, text) => {
        Swal.fire({
            title: title,
            text: text,
            icon: "error",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: "#F2EFE7",
            color: "#006A71",
            customClass: {
                popup: 'rounded-xl shadow-xl border border-secondary',
                title: 'text-2xl font-bold',
                icon: 'mt-3 text-primary',
            },
        });
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-background p-4"
        >
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md p-8 rounded-xl shadow-lg bg-background border border-secondary"
            >
                <motion.h2 
                    variants={itemVariants}
                    className="mb-6 text-3xl font-bold text-center text-textMain"
                >
                    Login to your account
                </motion.h2>
                
                <motion.p 
                    variants={itemVariants}
                    className="text-sm text-center text-textMain mb-8"
                >
                    Don't have an account?{' '}
                    <Link 
                        to='/register' 
                        className="text-primary hover:text-secondary transition-colors font-medium"
                    >
                        Register here
                    </Link>
                </motion.p>
                
                <motion.div variants={itemVariants} className="mb-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleLogin}
                        type="button"
                        className="flex items-center justify-center w-full p-3 space-x-3 border-2 border-secondary rounded-lg hover:bg-secondary/20 transition-colors"
                    >
                        <FcGoogle size={24} />
                        <span className="text-textMain">Login with Google</span>
                    </motion.button>
                </motion.div>
                
                <motion.div 
                    variants={itemVariants}
                    className="flex items-center w-full my-6"
                >
                    <hr className="flex-1 border-t border-secondary" />
                    <p className="px-3 text-textMain">OR</p>
                    <hr className="flex-1 border-t border-secondary" />
                </motion.div>
                
                <motion.form 
                    variants={containerVariants}
                    onSubmit={handleLogin} 
                    className="space-y-6"
                >
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-textMain">
                            Email address
                        </label>
                        <input 
                            required 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="leroy@jenkins.com" 
                            className="w-full px-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-textMain"
                        />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-2">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-textMain">
                                Password
                            </label>
                            <Link 
                                to="#" 
                                className="text-xs text-primary hover:text-secondary transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input 
                            required 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="********" 
                            className="w-full px-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-textMain"
                        />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="w-full py-3 px-4 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Login
                        </motion.button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </motion.div>
    );
};

export default Login;