import React from "react";
import { motion } from "framer-motion";
import { FiMessageSquare, FiBell, FiCoffee, FiClipboard, FiPhone, FiMail, FiUser } from "react-icons/fi";
import Navbar from "./Navbar.jsx";
import "./Home.css";

const StudentPage = () => {
  const actions = [
    { href: "/complaint", icon: FiMessageSquare, title: "Submit Complaint", description: "Report issues with rooms, facilities, or services", color: "#0ea5e9" },
    { href: "/my-complaints", icon: FiClipboard, title: "Track Status", description: "See complaint progress and warden replies", color: "#f59e0b" },
    { href: "/announcement", icon: FiBell, title: "Announcements", description: "Stay updated with the latest hostel notices", color: "#a855f7" },
    { href: "/getfood", icon: FiCoffee, title: "Food Menu", description: "View today's meals and dining schedule", color: "#10b981" },
  ];

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Welcome to HostelHub</h1>
          <p>Your all-in-one hostel utility service portal</p>
        </div>
      </header>

      <main className="page-content">
        <section className="action-grid">
          {actions.map((action, index) => (
            <motion.a
              key={action.href}
              href={action.href}
              className="action-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="action-card-icon" style={{ background: `${action.color}18`, color: action.color }}>
                <action.icon />
              </div>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </motion.a>
          ))}
        </section>

        <section className="home-contact-section">
          <div className="contact-card">
            <h3>Warden Contact</h3>
            <div className="contact-item"><FiUser /><span>Hostel Warden Office</span></div>
            <div className="contact-item"><FiPhone /><span>+91 9876543210</span></div>
            <div className="contact-item"><FiMail /><span>warden@hostelhub.edu</span></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentPage;
