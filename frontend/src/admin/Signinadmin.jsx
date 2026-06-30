import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usehostalstore } from '../store/hostal.js';
import { Input, Button, Alert } from '../components';
import '../pages/Signin.css';

function Signinadmin() {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { signInAccountadmin } = usehostalstore();

  const signIn = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!account.email) newErrors.email = "Email is required";
    if (!account.password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const { success, message } = await signInAccountadmin(account);
      if (success) {
        setTimeout(() => { window.location.href = "/admin"; }, 800);
      } else {
        setErrors({ form: message });
        setAccount({ email: "", password: "" });
      }
    } catch {
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <motion.div
        className="signin-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="signin-header">
          <h1>Admin Sign In</h1>
          <p>Access the hostel administration dashboard</p>
        </div>

        <form onSubmit={signIn} className="signin-form">
          {errors.form && (
            <Alert type="danger" title="Error" message={errors.form} closeable={false} />
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            id="email"
            placeholder="admin@example.com"
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

          <div className="signin-actions">
            <Button type="submit" variant="secondary" size="lg" className="btn-full" loading={loading} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In as Admin'}
            </Button>
          </div>
        </form>

        <div className="signin-footer">
          <p>Don't have an admin account? <a href="/signupadmin" className="signup-link">Sign up</a></p>
          <p className="admin-link">Student? <a href="/signin">Sign in as student</a></p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signinadmin;
