import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';
import Navbar from './Navbar';
import { usehostalstore } from '../store/hostal.js';
import './Hostellers.css';

function Hostellers() {
  const { stud, fetchstud } = usehostalstore();

  useEffect(() => {
    fetchstud();
  }, [fetchstud]);

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Registered Hostellers</h1>
          <p>View all students registered in the system</p>
        </div>
      </header>

      <main className="page-content">
        {stud.length > 0 ? (
          <div className="data-grid">
            {stud.map((student, index) => (
              <motion.div
                key={index}
                className="data-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="data-card-label">Student #{index + 1}</div>
                <p className="data-card-value"><strong>Name:</strong> {student.name}</p>
                <p className="data-card-value"><strong>Email:</strong> {student.email}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FiUsers /></div>
            <h3>No students found</h3>
            <p>Registered students will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Hostellers;
