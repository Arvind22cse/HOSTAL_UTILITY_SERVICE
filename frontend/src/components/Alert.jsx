import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Alert.css';

const Alert = ({
  type = 'primary',
  title,
  message,
  onClose,
  closeable = true,
  delay = 0,
}) => {
  return (
    <motion.div
      className={`alert alert-${type}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="alert-content">
        <div className="alert-message">
          {title && <div className="alert-title">{title}</div>}
          {message && <div className="alert-text">{message}</div>}
        </div>
        {closeable && (
          <button className="alert-close" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Alert;
