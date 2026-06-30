import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiCoffee } from "react-icons/fi";
import Navbar from "./Navbar.jsx";
import { usehostalstore } from "../store/hostal.js";
import { Badge } from "../components";
import "./Foodview.css";

function FoodView() {
  const { food, fetchfood } = usehostalstore();

  useEffect(() => {
    fetchfood();
  }, [fetchfood]);

  const grouped = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = food.filter((f) => (f.mealType || "lunch") === type);
    return acc;
  }, {});

  return (
    <div className="page-with-nav">
      <Navbar />

      <header className="page-header">
        <div className="page-header-content">
          <h1>Food Menu</h1>
          <p>Today's meals and dining schedule</p>
        </div>
      </header>

      <main className="page-content">
        {food && food.length > 0 ? (
          MEAL_TYPES.map((type) =>
            grouped[type]?.length > 0 ? (
              <section key={type} className="meal-section">
                <h2 className="meal-section-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                <div className="food-grid">
                  {grouped[type].map((item, index) => (
                    <motion.div
                      key={item._id}
                      className="food-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <img src={item.img} alt={item.foodname} className="food-card-img" />
                      <div className="food-card-body">
                        <Badge variant="success">{item.mealType}</Badge>
                        <h3>{item.foodname}</h3>
                        <p>{new Date(item.time).toLocaleString()}</p>
                        {item.description && <p className="food-card-desc">{item.description}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ) : null
          )
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FiCoffee /></div>
            <h3>No food items yet</h3>
            <p>The menu will be updated by the warden soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snacks"];

export default FoodView;
