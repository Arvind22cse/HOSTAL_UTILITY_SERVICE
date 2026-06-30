import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import Navbar from "./Navbar.jsx";
import { usehostalstore } from "../store/hostal.js";
import { Input, Button, Alert } from "../components";
import "../pages/Announce.css";

function Announcement() {
  const [announce, setAnnounce] = useState({ title: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { ann, createAnnounce, fetchAnnounce, deleteAnnounce } = usehostalstore();

  useEffect(() => {
    fetchAnnounce();
  }, [fetchAnnounce]);

  const Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const { success, message } = await createAnnounce(announce);
    if (success) {
      setAlert({ type: "success", message: "Announcement posted to all students!" });
      setAnnounce({ title: "", text: "" });
    } else {
      setAlert({ type: "danger", message: message || "Failed to post announcement." });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    await deleteAnnounce(id);
  };

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Announcements</h1>
          <p>Broadcast important notices to all hostellers</p>
        </div>
      </header>

      <main className="page-content">
        <div className="announce-admin-layout">
          <motion.div className="form-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="form-card-header">
              <h2>New Announcement</h2>
              <p>This message will be visible to all students</p>
            </div>

            <form onSubmit={Submit}>
              {alert && <Alert type={alert.type} message={alert.message} closeable={false} />}

              <Input
                label="Title"
                value={announce.title}
                onChange={(e) => setAnnounce({ ...announce, title: e.target.value })}
                placeholder="e.g. Water Supply Maintenance"
                required
              />

              <div className="form-group">
                <label className="form-label">Message <span className="required">*</span></label>
                <textarea
                  className="input-field"
                  placeholder="Write your announcement for all students..."
                  value={announce.text}
                  onChange={(e) => setAnnounce({ ...announce, text: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="btn-full" loading={loading} disabled={loading}>
                Post to All Students
              </Button>
            </form>
          </motion.div>

          <div className="announce-admin-list">
            <h3>Posted Announcements</h3>
            {ann.length > 0 ? (
              ann.map((item) => (
                <div key={item._id} className="announce-card announce-card-admin">
                  <div className="announce-body">
                    <span className="announce-label">{item.title || "Notice"}</span>
                    <p>{item.text}</p>
                    <small>{new Date(item.createdAt).toLocaleString()} · {item.postedBy || "Warden"}</small>
                  </div>
                  <button type="button" className="icon-btn icon-btn-danger" onClick={() => handleDelete(item._id)} aria-label="Delete">
                    <FiTrash2 />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted">No announcements posted yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Announcement;
