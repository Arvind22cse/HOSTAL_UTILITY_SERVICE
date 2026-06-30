import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usehostalstore } from '../store/hostal.js';
import { Input, Button, Alert } from '../components';
import './Signup.css';

function Signup() {
    const [newAccount, setNewAccount] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        roomno: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const { createAccount } = usehostalstore();

    const validateForm = () => {
        const newErrors = {};
        
        if (!newAccount.name.trim()) {
            newErrors.name = "Name is required";
        } else if (newAccount.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }
        
        if (!newAccount.email) {
            newErrors.email = "Email is required";
        } else if (!newAccount.email.includes('@')) {
            newErrors.email = "Enter a valid email address";
        }
        
        if (!newAccount.password) {
            newErrors.password = "Password is required";
        } else if (newAccount.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if (newAccount.password !== newAccount.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        return newErrors;
    };

    const signup = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSuccess(false);
            return;
        }

        setLoading(true);
        setErrors({});
        
        try {
            const { success: isSuccess, message: responseMessage } = await createAccount({
                name: newAccount.name,
                email: newAccount.email,
                password: newAccount.password,
                roomno: newAccount.roomno,
            });
            
            setMessage(responseMessage);
            
            if (isSuccess) {
                setSuccess(true);
                setNewAccount({ name: "", email: "", password: "", confirmPassword: "", roomno: "" });
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 2000);
            } else {
                setErrors({ form: responseMessage });
                setSuccess(false);
            }
        } catch (error) {
            setErrors({ form: "An error occurred. Please try again." });
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <div className="signup-page">
            <motion.div
                className="signup-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="signup-header">
                    <h1>Create Your Account</h1>
                    <p>Join our hostel community today</p>
                </motion.div>

                <motion.form
                    variants={itemVariants}
                    onSubmit={signup}
                    className="signup-form"
                >
                    {success && (
                        <Alert
                            type="success"
                            title="Success!"
                            message="Your account has been created. Redirecting to sign in..."
                            closeable={false}
                        />
                    )}

                    {errors.form && (
                        <Alert
                            type="danger"
                            title="Error"
                            message={errors.form}
                            closeable={true}
                            onClose={() => setErrors({ ...errors, form: '' })}
                        />
                    )}

                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="John Doe"
                        value={newAccount.name}
                        onChange={(e) => {
                            setNewAccount({ ...newAccount, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        error={errors.name}
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        value={newAccount.email}
                        onChange={(e) => {
                            setNewAccount({ ...newAccount, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        error={errors.email}
                        required
                    />

                    <Input
                        label="Room Number"
                        type="text"
                        name="roomno"
                        id="roomno"
                        placeholder="e.g. 204"
                        value={newAccount.roomno}
                        onChange={(e) => setNewAccount({ ...newAccount, roomno: e.target.value })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Min 6 characters"
                        value={newAccount.password}
                        onChange={(e) => {
                            setNewAccount({ ...newAccount, password: e.target.value });
                            if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                        error={errors.password}
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Re-enter your password"
                        value={newAccount.confirmPassword}
                        onChange={(e) => {
                            setNewAccount({ ...newAccount, confirmPassword: e.target.value });
                            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                        }}
                        error={errors.confirmPassword}
                        required
                    />

                    <motion.div
                        variants={itemVariants}
                        className="signup-actions"
                    >
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="btn-full"
                            disabled={loading}
                            loading={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </motion.div>
                </motion.form>

                <motion.div variants={itemVariants} className="signup-footer">
                    <p  style={{ color: "#0ea5e9" }}>Already have an account?{' '}
                        <a href="/signin" className="signin-link">
                            Sign in here
                        </a>
                    </p>
                    <p className="admin-signup">
                        Admin?{' '}
                        <a href="/signupadmin">
                            Create admin account
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Signup;
