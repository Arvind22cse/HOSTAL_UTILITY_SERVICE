import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({
  children,
  interactive = false,
  onClick,
  className = '',
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      className={`card ${interactive ? 'card-interactive' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={interactive ? { y: -8 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
