import React from 'react';
import { motion } from 'framer-motion';
import './Badge.css';

const Badge = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <motion.span
      className={`badge badge-${variant} ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
