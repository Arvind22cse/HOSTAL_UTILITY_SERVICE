import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <motion.button
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      {loading ? (
        <span className="flex-center gap-2">
          <span className="spinner-sm"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
