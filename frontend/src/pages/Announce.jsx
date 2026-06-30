import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiBell } from "react-icons/fi";
import Navbar from "./Navbar";
import { usehostalstore } from "../store/hostal.js";
import "./Announce.css";

function Announce() {
  const { ann, fetchAnnounce } = usehostalstore();

  useEffect(() => {
    fetchAnnounce();
  }, [fetchAnnounce]);

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Announcements</h1>
          <p>Latest updates and notices from hostel administration</p>
        </div>
      </header>

      <main className="page-content">
        {ann.length > 0 ? (
          <div className="announce-list">
            {ann.map((item, index) => (
              <motion.div
                key={item._id || index}
                className="announce-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="announce-icon"><FiBell /></div>
                <div className="announce-body">
                  <span className="announce-label">{item.title || "Notice"}</span>
                  <p>{item.text}</p>
                  <small className="announce-date">
                    {new Date(item.createdAt).toLocaleDateString()} · {item.postedBy || "Warden"}
                  </small>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FiBell /></div>
            <h3>No announcements</h3>
            <p>Check back later for updates from the warden.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Announce;
