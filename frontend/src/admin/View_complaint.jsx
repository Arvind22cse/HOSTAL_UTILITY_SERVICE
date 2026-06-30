import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiInbox, FiSend } from "react-icons/fi";
import Navbar from "./Navbar";
import { usehostalstore } from "../store/hostal.js";
import { Button, Alert, Badge } from "../components";
import "./View_complaint.css";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", variant: "warning" },
  { value: "in_progress", label: "In Progress", variant: "primary" },
  { value: "resolved", label: "Resolved", variant: "success" },
];

function View_complaint() {
  const { comp, fetchComplaints, updateComplaint } = usehostalstore();
  const [comments, setComments] = useState({});
  const [statuses, setStatuses] = useState({});
  const [saving, setSaving] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  useEffect(() => {
    const initial = {};
    comp.forEach((c) => {
      initial[c._id] = c.status || "pending";
    });
    setStatuses(initial);
  }, [comp]);

  const handleUpdate = async (id) => {
    setSaving((s) => ({ ...s, [id]: true }));
    setAlert(null);
    const result = await updateComplaint(id, {
      status: statuses[id],
      wardenComment: comments[id] ?? "",
    });
    if (result.success) {
      setAlert({ type: "success", message: "Complaint updated. Student can see the status and your reply." });
    } else {
      setAlert({ type: "danger", message: result.message || "Update failed" });
    }
    setSaving((s) => ({ ...s, [id]: false }));
  };

  const getStatusVariant = (status) =>
    STATUS_OPTIONS.find((o) => o.value === status)?.variant || "warning";

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Manage Complaints</h1>
          <p>Review student complaints, update status, and send private replies</p>
        </div>
      </header>

      <main className="page-content">
        {alert && <Alert type={alert.type} message={alert.message} closeable={false} />}

        {comp.length > 0 ? (
          <div className="admin-complaint-list">
            {comp.map((complaint, index) => (
              <motion.div
                key={complaint._id}
                className="admin-complaint-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="admin-complaint-top">
                  <div>
                    <span className="complaint-id">#{complaint._id.slice(-6).toUpperCase()}</span>
                    <h3>{complaint.name}</h3>
                    <p className="complaint-sub">{complaint.email} · Room {complaint.roomno}</p>
                  </div>
                  <Badge variant={getStatusVariant(complaint.status)}>
                    {complaint.status?.replace("_", " ")}
                  </Badge>
                </div>

                <div className="complaint-body">
                  <span className="category-tag">{complaint.category || "other"}</span>
                  <p>{complaint.comp}</p>
                  <small>Submitted {new Date(complaint.createdAt).toLocaleString()}</small>
                </div>

                <div className="complaint-actions">
                  <div className="form-group">
                    <label className="form-label">Update Status</label>
                    <select
                      className="input-field"
                      value={statuses[complaint._id] || "pending"}
                      onChange={(e) =>
                        setStatuses((s) => ({ ...s, [complaint._id]: e.target.value }))
                      }
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Private Reply to Student</label>
                    <textarea
                      className="input-field"
                      placeholder="Write a message visible only to this student..."
                      defaultValue={complaint.wardenComment || ""}
                      onChange={(e) =>
                        setComments((c) => ({ ...c, [complaint._id]: e.target.value }))
                      }
                      rows={3}
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    loading={saving[complaint._id]}
                    disabled={saving[complaint._id]}
                    onClick={() => handleUpdate(complaint._id)}
                  >
                    <FiSend /> Update & Notify Student
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FiInbox /></div>
            <h3>No complaints yet</h3>
            <p>When students submit complaints, they'll appear here for you to manage.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default View_complaint;
