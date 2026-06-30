import React, { useState } from "react";
import { usehostalstore } from "../store/hostal.js";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "../components/ThemeToggle";
import "../pages/Navbar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { logout, currentUser } = usehostalstore();

  const links = [
    { href: "/hostalstud", label: "Hostellers" },
    { href: "/announ", label: "Announcements" },
    { href: "/viewcomplaint", label: "Complaints" },
    { href: "/food", label: "Food Menu" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="app-navbar app-navbar--admin">
      <div className="app-navbar-inner">
        <a href="/admin" className="app-navbar-brand">Warden Portal</a>

        <ul className={`app-nav-links ${isMobile ? "app-nav-links--open" : ""}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsMobile(false)}>{link.label}</a>
            </li>
          ))}
          <li className="nav-user"><span>{currentUser?.name}</span></li>
          <li><ThemeToggle /></li>
          <li>
            <button type="button" className="app-nav-logout" onClick={handleLogout} aria-label="Logout">
              <FiLogOut /><span>Logout</span>
            </button>
          </li>
        </ul>

        <button type="button" className="app-nav-toggle" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
