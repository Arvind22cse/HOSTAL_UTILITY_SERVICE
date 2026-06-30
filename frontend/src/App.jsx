import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Admin from "./admin/Admin";
import Hostal from "./pages/Hostal";
import Signinadmin from "./admin/Signinadmin";
import Signupadmin from "./admin/Signupadmin";
import Complaint from "./pages/Complaint";
import MyComplaints from "./pages/MyComplaints";
import View_complaint from "./admin/View_complaint";
import Food from "./admin/Food";
import FoodView from "./pages/Foodview";
import Foodreview from "./pages/Foodreview";
import Hostellers from "./admin/Hostellers";
import Announcement from "./admin/Anouncement";
import Announce from "./pages/Announce";
import "./App.css";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.4 };

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{ width: "100%" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Hostal />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signinadmin" element={<Signinadmin />} />
          <Route path="/signupadmin" element={<Signupadmin />} />

          <Route path="/home" element={<ProtectedRoute role="student"><Home /></ProtectedRoute>} />
          <Route path="/complaint" element={<ProtectedRoute role="student"><Complaint /></ProtectedRoute>} />
          <Route path="/my-complaints" element={<ProtectedRoute role="student"><MyComplaints /></ProtectedRoute>} />
          <Route path="/announcement" element={<ProtectedRoute role="student"><Announce /></ProtectedRoute>} />
          <Route path="/getfood" element={<ProtectedRoute role="student"><FoodView /></ProtectedRoute>} />
          <Route path="/review" element={<ProtectedRoute role="student"><Foodreview /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
          <Route path="/viewcomplaint" element={<ProtectedRoute role="admin"><View_complaint /></ProtectedRoute>} />
          <Route path="/food" element={<ProtectedRoute role="admin"><Food /></ProtectedRoute>} />
          <Route path="/hostalstud" element={<ProtectedRoute role="admin"><Hostellers /></ProtectedRoute>} />
          <Route path="/announ" element={<ProtectedRoute role="admin"><Announcement /></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
