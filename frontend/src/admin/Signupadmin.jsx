import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usehostalstore } from '../store/hostal.js';
import { Input, Button, Alert } from '../components';
import '../pages/Signup.css';

function Signupadmin() {
  const [newAccount, setNewAccount] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const { createAccountadmin } = usehostalstore();

  const validateForm = () => {
    const newErrors = {};
    if (!newAccount.name.trim()) newErrors.name = "Name is required";
    if (!newAccount.email) newErrors.email = "Email is required";
    if (!newAccount.password) newErrors.password = "Password is required";
    else if (newAccount.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const signup = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { success: isSuccess, message } = await createAccountadmin(newAccount);
      if (isSuccess) {
        setSuccess(true);
        setNewAccount({ name: "", email: "", password: "" });
        setTimeout(() => { window.location.href = "/signinadmin"; }, 2000);
      } else {
        setErrors({ form: message });
      }
    } catch {
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <motion.div
        className="signup-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="signup-header">
          <h1>Create Admin Account</h1>
          <p>Register as a hostel administrator</p>
        </div>

        <form onSubmit={signup} className="signup-form">
          {success && (
            <Alert type="success" title="Success!" message="Account created. Redirecting to sign in..." closeable={false} />
          )}
          {errors.form && (
            <Alert type="danger" title="Error" message={errors.form} closeable onClose={() => setErrors({ ...errors, form: '' })} />
          )}

          <Input
            label="Full Name"
            type="text"
            name="name"
            id="name"
            placeholder="Admin name"
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
            placeholder="admin@example.com"
            value={newAccount.email}
            onChange={(e) => {
              setNewAccount({ ...newAccount, email: e.target.value });
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
            placeholder="Min 6 characters"
            value={newAccount.password}
            onChange={(e) => {
              setNewAccount({ ...newAccount, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            required
          />

          <div className="signup-actions">
            <Button type="submit" variant="secondary" size="lg" className="btn-full" loading={loading} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </Button>
          </div>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <a href="/signinadmin" className="signin-link">Sign in</a></p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signupadmin;
