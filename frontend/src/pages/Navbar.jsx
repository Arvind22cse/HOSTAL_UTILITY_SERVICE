import React, { useState } from "react";
import { usehostalstore } from "../store/hostal.js";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "../components/ThemeToggle";
import "./Navbar.css";

const Navbar = ({ variant = "student" }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { logout, currentUser } = usehostalstore();

  const studentLinks = [
    { href: "/complaint", label: "Complaint" },
    { href: "/my-complaints", label: "My Status" },
    { href: "/announcement", label: "Announcements" },
    { href: "/getfood", label: "Food Menu" },
  ];

  const adminLinks = [
    { href: "/hostalstud", label: "Hostellers" },
    { href: "/announ", label: "Announcements" },
    { href: "/viewcomplaint", label: "Complaints" },
    { href: "/food", label: "Food Menu" },
  ];

  const links = variant === "admin" ? adminLinks : studentLinks;
  const brandHref = variant === "admin" ? "/admin" : "/home";

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner">
        <a href={brandHref} className="app-navbar-brand">
          {variant === "admin" ? "Warden Portal" : "HostelHub"}
        </a>

        <ul className={`app-nav-links ${isMobile ? "app-nav-links--open" : ""}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsMobile(false)}>{link.label}</a>
            </li>
          ))}
          <li className="nav-user">
            <span>{currentUser?.name}</span>
          </li>
          <li><ThemeToggle /></li>
          <li>
            <button type="button" className="app-nav-logout" onClick={handleLogout} aria-label="Logout">
              <FiLogOut /><span>Logout</span>
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="app-nav-toggle"
          onClick={() => setIsMobile(!isMobile)}
          aria-label={isMobile ? "Close menu" : "Open menu"}
        >
          {isMobile ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
