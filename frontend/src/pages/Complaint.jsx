import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar.jsx";
import { usehostalstore } from "../store/hostal.js";
import { Input, Button, Alert } from "../components";

const CATEGORIES = [
  { value: "maintenance", label: "Maintenance" },
  { value: "cleanliness", label: "Cleanliness" },
  { value: "food", label: "Food" },
  { value: "security", label: "Security" },
  { value: "other", label: "Other" },
];

function Complaint() {
  const { currentUser, createComplain } = usehostalstore();
  const [complaint, setComplaint] = useState({
    roomno: "",
    category: "other",
    comp: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (currentUser?.roomno) {
      setComplaint((c) => ({ ...c, roomno: currentUser.roomno }));
    }
  }, [currentUser]);

  const Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const { success, message } = await createComplain(complaint);
    if (success) {
      setAlert({
        type: "success",
        message: "Complaint submitted! Track its status on My Complaints page.",
      });
      setComplaint({ roomno: currentUser?.roomno || "", category: "other", comp: "" });
    } else {
      setAlert({ type: "danger", message: message || "Failed to submit complaint." });
    }
    setLoading(false);
  };

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Submit a Complaint</h1>
          <p>Report issues — the warden will respond privately to you</p>
        </div>
      </header>

      <div className="form-page">
        <motion.div
          className="form-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="form-card-header">
            <h2>Complaint Form</h2>
            <p>Logged in as {currentUser?.name} ({currentUser?.email})</p>
          </div>

          <form onSubmit={Submit}>
            {alert && <Alert type={alert.type} message={alert.message} closeable={false} />}

            <Input
              label="Room Number"
              type="text"
              name="roomno"
              placeholder="e.g. 204"
              value={complaint.roomno}
              onChange={(e) => setComplaint({ ...complaint, roomno: e.target.value })}
              required
            />

            <div className="form-group">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                className="input-field"
                value={complaint.category}
                onChange={(e) => setComplaint({ ...complaint, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comp" className="form-label">
                Complaint Details <span className="required">*</span>
              </label>
              <textarea
                id="comp"
                className="input-field"
                placeholder="Describe your issue in detail..."
                value={complaint.comp}
                onChange={(e) => setComplaint({ ...complaint, comp: e.target.value })}
                required
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="btn-full" loading={loading} disabled={loading}>
              Submit Complaint
            </Button>

            <p className="form-footer-link">
              <a href="/my-complaints">View my complaint status →</a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Complaint;
