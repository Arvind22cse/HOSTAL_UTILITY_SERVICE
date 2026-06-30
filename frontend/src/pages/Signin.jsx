import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usehostalstore } from '../store/hostal.js';
import { Input, Button, Alert } from '../components';
import './Signin.css';

function Signin() {
    const [account, setAccount] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { signInAccount } = usehostalstore();

    const validateForm = () => {
        const newErrors = {};
        if (!account.email) newErrors.email = "Email is required";
        if (!account.password) newErrors.password = "Password is required";
        if (account.email && !account.email.includes('@')) newErrors.email = "Enter a valid email";
        return newErrors;
    };

    const signIn = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await signInAccount(account);
            const { success, message, isAdmin } = response;
            setMessage(message);
            
            if (success) {
                setErrors({});
                setTimeout(() => {
                    window.location.href = "/home";
                }, 1000);
            } else {
                setAccount({ email: "", password: "" });
                setErrors({ form: message });
            }
        } catch (error) {
            setErrors({ form: "An error occurred. Please try again." });
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
        <div className="signin-page">
            <motion.div
                className="signin-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="signin-header">
                    <h1>Student Sign In</h1>
                    <p>Access your hostel management dashboard</p>
                </motion.div>

                <motion.form
                    variants={itemVariants}
                    onSubmit={(e) => {
                        e.preventDefault();
                        signIn();
                    }}
                    className="signin-form"
                >
                    {errors.form && (
                        <Alert
                            type="danger"
                            title="Error"
                            message={errors.form}
                            closeable={false}
                        />
                    )}

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        value={account.email}
                        onChange={(e) => {
                            setAccount({ ...account, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        error={errors.email}
                        required
                        
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={account.password}
                        onChange={(e) => {
                            setAccount({ ...account, password: e.target.value });
                            if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                        error={errors.password}
                        required
                    />

                    <motion.div
                        variants={itemVariants}
                        className="signin-actions"
                    >
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="btn-full"
                            disabled={loading}
                            loading={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </motion.div>
                </motion.form>

                <motion.div variants={itemVariants} className="signin-footer">
                    <p>Don't have an account?{' '}
                        <a href="/signup" className="signup-link">
                            Sign up here
                        </a>
                    </p>
                    <p className="admin-link">
                        Admin?{' '}
                        <a href="/signinadmin">
                            Sign in as admin
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Signin;
