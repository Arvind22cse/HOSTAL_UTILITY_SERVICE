import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FiUsers, FiBell, FiAlertCircle, FiCoffee } from "react-icons/fi";
import "./Admin.css";

const WardenPage = () => {
  const services = [
    { title: "Maintenance Requests", phone: "+91 9876543210", email: "maintenance@hostel.com" },
    { title: "Cleaning Services", phone: "+91 8765432109", email: "cleaning@hostel.com" },
    { title: "Electrical Repairs", phone: "+91 7654321098", email: "electrical@hostel.com" },
  ];

  const adminActions = [
    { href: "/hostalstud", icon: FiUsers, title: "Hostellers", description: "View registered students", color: "#0ea5e9" },
    { href: "/announ", icon: FiBell, title: "Announcements", description: "Post new announcements", color: "#a855f7" },
    { href: "/viewcomplaint", icon: FiAlertCircle, title: "Complaints", description: "Update status & reply to students", color: "#ef4444" },
    { href: "/food", icon: FiCoffee, title: "Food Menu", description: "Manage daily food items", color: "#10b981" },
  ];

  const carouselImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjQl0Ni5Na7YrsyxrfU_YHAYLuHy48g6JlBA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqRWcTadY1ikboz9Iu3RiXGlcuLVg6bzFIoA&s",
    "https://5.imimg.com/data5/SELLER/Default/2024/6/430588934/OF/GP/US/187348836/hostel-construction-500x500.jpg",
  ];

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Warden Dashboard</h1>
          <p>Manage complaints, announcements, food menu, and hostellers</p>
        </div>
      </header>

      <main className="page-content">
        <section className="action-grid">
          {adminActions.map((action, index) => (
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

        <section className="admin-carousel-section">
          <h2 className="section-heading">Campus Overview</h2>
          <div className="admin-carousel">
            <div className="admin-carousel-track">
              {[...carouselImages, ...carouselImages].map((src, i) => (
                <div key={i} className="admin-carousel-slide">
                  <img src={src} alt={`Hostel ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="services-section">
          <h2 className="section-heading">Service Contacts</h2>
          <div className="data-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="data-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="data-card-label">{service.title}</div>
                <p className="data-card-value"><strong>Phone:</strong> {service.phone}</p>
                <p className="data-card-value"><strong>Email:</strong> {service.email}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="admin-footer">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WardenPage;
