import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Input.css';

const Input = ({
  label,
  error,
  success,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={props.id || props.name} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <motion.input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`input-field ${error ? 'error' : ''} ${success ? 'success' : ''} ${className}`}
        whileFocus={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.div
            className="form-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        )}
        {success && !error && (
          <motion.div
            className="form-success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
