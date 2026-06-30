import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import Navbar from "./Navbar.jsx";
import { usehostalstore } from "../store/hostal.js";
import { Input, Button, Alert } from "../components";
import "./Food.css";

const EMPTY_FOOD = { foodname: "", mealType: "lunch", time: "", img: "", description: "" };
const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snacks"];

function Food() {
  const { food, fetchfood, createFood, updateFood, deleteFood } = usehostalstore();
  const [form, setForm] = useState(EMPTY_FOOD);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchfood();
  }, [fetchfood]);

  const resetForm = () => {
    setForm(EMPTY_FOOD);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const action = editingId ? updateFood(editingId, form) : createFood(form);
    const { success, message } = await action;

    if (success) {
      setAlert({ type: "success", message: editingId ? "Food item updated!" : "Food item added!" });
      resetForm();
      fetchfood();
    } else {
      setAlert({ type: "danger", message: message || "Operation failed" });
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setForm({
      foodname: item.foodname,
      mealType: item.mealType || "lunch",
      time: item.time ? new Date(item.time).toISOString().slice(0, 16) : "",
      img: item.img,
      description: item.description || "",
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this food item?")) return;
    const { success } = await deleteFood(id);
    if (success) {
      setAlert({ type: "success", message: "Food item deleted" });
    }
  };

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Manage Food Menu</h1>
          <p>Add, edit, and remove daily meal items</p>
        </div>
      </header>

      <main className="page-content food-admin-page">
        {alert && <Alert type={alert.type} message={alert.message} closeable={false} />}

        <div className="food-admin-toolbar">
          <Button variant="primary" onClick={() => { resetForm(); setShowForm(true); }}>
            <FiPlus /> Add Food Item
          </Button>
        </div>

        {showForm && (
          <motion.div className="form-card form-card-wide food-form-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>{editingId ? "Edit Food Item" : "New Food Item"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <Input
                  label="Food Name"
                  value={form.foodname}
                  onChange={(e) => setForm({ ...form, foodname: e.target.value })}
                  placeholder="e.g. Idli & Sambar"
                  required
                />
                <div className="form-group">
                  <label className="form-label">Meal Type</label>
                  <select
                    className="input-field"
                    value={form.mealType}
                    onChange={(e) => setForm({ ...form, mealType: e.target.value })}
                  >
                    {MEAL_TYPES.map((m) => (
                      <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Input
                label="Date & Time"
                type="datetime-local"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
              <Input
                label="Image URL"
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                placeholder="https://example.com/food.jpg"
                required
              />
              <div className="form-group">
                <label className="form-label">Description (optional)</label>
                <textarea
                  className="input-field"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description..."
                />
              </div>
              <div className="form-actions-row">
                <Button type="submit" variant="primary" loading={loading} disabled={loading}>
                  {editingId ? "Update" : "Add"} Food Item
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="food-admin-grid">
          {food.map((item, index) => (
            <motion.div
              key={item._id}
              className="food-admin-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <img src={item.img} alt={item.foodname} className="food-admin-img" />
              <div className="food-admin-body">
                <span className="meal-badge">{item.mealType}</span>
                <h4>{item.foodname}</h4>
                <p>{new Date(item.time).toLocaleString()}</p>
                {item.description && <p className="food-desc">{item.description}</p>}
              </div>
              <div className="food-admin-actions">
                <button type="button" className="icon-btn" onClick={() => handleEdit(item)} aria-label="Edit">
                  <FiEdit2 />
                </button>
                <button type="button" className="icon-btn icon-btn-danger" onClick={() => handleDelete(item._id)} aria-label="Delete">
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {food.length === 0 && (
          <div className="empty-state">
            <h3>No food items</h3>
            <p>Add meals for students to view on the Food Menu page.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Food;
