import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiInbox, FiClock, FiCheckCircle, FiLoader } from "react-icons/fi";
import Navbar from "./Navbar";
import { usehostalstore } from "../store/hostal.js";
import { Badge } from "../components";
import "./MyComplaints.css";

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: FiClock, variant: "warning" },
  in_progress: { label: "In Progress", icon: FiLoader, variant: "primary" },
  resolved: { label: "Resolved", icon: FiCheckCircle, variant: "success" },
};

function MyComplaints() {
  const { comp, fetchMyComplaints } = usehostalstore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyComplaints().finally(() => setLoading(false));
  }, [fetchMyComplaints]);

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>My Complaints</h1>
          <p>Track the status of your submitted complaints and warden responses</p>
        </div>
      </header>

      <main className="page-content">
        {loading ? (
          <div className="empty-state">
            <div className="loader" />
            <p>Loading your complaints...</p>
          </div>
        ) : comp.length > 0 ? (
          <div className="complaint-status-list">
            {comp.map((item, index) => {
              const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
              const StatusIcon = cfg.icon;
              return (
                <motion.div
                  key={item._id}
                  className="complaint-status-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="complaint-status-header">
                    <div>
                      <span className="complaint-id">#{item._id.slice(-6).toUpperCase()}</span>
                      <h3>{item.category?.replace("_", " ") || "General"}</h3>
                    </div>
                    <Badge variant={cfg.variant}>
                      <StatusIcon /> {cfg.label}
                    </Badge>
                  </div>

                  <p className="complaint-text">{item.comp}</p>

                  <div className="complaint-meta">
                    <span>Room {item.roomno}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>

                  {item.wardenComment && (
                    <div className="warden-reply">
                      <strong>Warden Response</strong>
                      <p>{item.wardenComment}</p>
                      {item.resolvedAt && (
                        <small>Resolved on {new Date(item.resolvedAt).toLocaleString()}</small>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FiInbox /></div>
            <h3>No complaints yet</h3>
            <p>Submit a complaint from the Complaint page to track its status here.</p>
            <a href="/complaint" className="btn btn-primary">Submit Complaint</a>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyComplaints;
