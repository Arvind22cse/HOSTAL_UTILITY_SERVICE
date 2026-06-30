import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiShield, FiHome, FiArrowRight } from 'react-icons/fi';
import ThemeToggle from '../components/ThemeToggle';
import './Hostal.css';

function Hostal() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const roles = [
    {
      title: 'Student',
      description: 'Access complaints, announcements, food menu & more',
      icon: FiUsers,
      href: '/signin',
      color: 'student',
    },
    {
      title: 'Admin',
      description: 'Manage hostellers, food, complaints & announcements',
      icon: FiShield,
      href: '/signinadmin',
      color: 'admin',
    },
  ];

  return (
    <div className="landing-page">
      <div className="landing-theme-toggle"><ThemeToggle /></div>
      <div className="landing-bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <motion.div
        className="landing-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="landing-brand">
          <div className="landing-logo">
            <FiHome />
          </div>
          <h1>HostelHub</h1>
          <p>Professional hostel utility service management for students and wardens</p>
        </motion.div>

        <motion.p variants={itemVariants} className="landing-subtitle">
          Choose how you'd like to sign in
        </motion.p>

        <motion.div variants={itemVariants} className="role-cards">
          {roles.map((role) => (
            <motion.a
              key={role.title}
              href={role.href}
              className={`role-card role-card--${role.color}`}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="role-card-icon">
                <role.icon />
              </div>
              <h2>{role.title}</h2>
              <p>{role.description}</p>
              <span className="role-card-cta">
                Continue <FiArrowRight />
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="landing-footer">
          <p>New student? <a href="/signup">Create an account</a></p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hostal;
