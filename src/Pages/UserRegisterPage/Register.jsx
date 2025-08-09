import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthProvider/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
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

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'RUN | Registration';
    }, []);

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

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (!/\d/.test(password)) {
            return "Password must contain at least one number";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        return "";
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;
        
        const passwordValidation = validatePassword(password);
        if (passwordValidation) {
            setPasswordError(passwordValidation);
            return;
        }
        setPasswordError('');

        const userData = { name, email, photo, password };

        try {
            const res = await registerUser(email, password);
            if (res?.user) {
                const data = await axios.post('http://localhost:3000/users', userData);
                if (data?.data?.insertedId) {
                    showSuccessAlert("Registration Successful!");
                    e.target.reset();
                    navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
            showErrorAlert("Registration Failed!", error.message || "Try Again");
        }
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
                    Create an Account
                </motion.h2>
                
                <motion.p 
                    variants={itemVariants}
                    className="text-sm text-center text-textMain mb-8"
                >
                    Already have an account?{' '}
                    <Link 
                        to='/login' 
                        className="text-primary hover:text-secondary transition-colors font-medium"
                    >
                        Login here
                    </Link>
                </motion.p>
                
                <motion.form 
                    variants={containerVariants}
                    onSubmit={handleRegister} 
                    className="space-y-4"
                >
                    {/* Name Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-textMain">
                            Full Name
                        </label>
                        <input 
                            required 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="John Doe" 
                            className="w-full px-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-textMain"
                        />
                    </motion.div>
                    
                    {/* Email Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-textMain">
                            Email Address
                        </label>
                        <input 
                            required 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="john@example.com" 
                            className="w-full px-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-textMain"
                        />
                    </motion.div>
                    
                    {/* Photo URL Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label htmlFor="photo" className="block text-sm font-medium text-textMain">
                            Photo URL (Optional)
                        </label>
                        <input 
                            type="text" 
                            name="photo" 
                            id="photo" 
                            placeholder="https://example.com/photo.jpg" 
                            className="w-full px-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-textMain"
                        />
                    </motion.div>
                    
                    {/* Password Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-textMain">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            minLength="8"
                            className="w-full px-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-textMain"
                            onChange={(e) => {
                                const error = validatePassword(e.target.value);
                                setPasswordError(error);
                            }}
                        />
                        {passwordError && (
                            <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-xs text-red-500 mt-1"
                            >
                                {passwordError}
                            </motion.p>
                        )}
                        <p className="text-xs text-textMain mt-1">
                            Must be 8+ characters with uppercase, lowercase, and number
                        </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="pt-2">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="w-full py-3 px-4 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            disabled={!!passwordError}
                        >
                            Register
                        </motion.button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </motion.div>
    );
};

export default Register;