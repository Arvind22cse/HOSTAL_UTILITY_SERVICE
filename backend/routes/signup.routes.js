import express from "express";
import { create_account, signin } from "../controllers/signup.controllers.js";
import { create_account_admin, signin_admin } from "../controllers/logadmin.controllers.js";
import {
  create_complaint,
  get_complaints,
  get_my_complaints,
  update_complaint,
  get_hostalstud,
} from "../controllers/complaint.controllers.js";
import { create_food, get_food, update_food, delete_food } from "../controllers/Food.controllers.js";
import { create_announce, get_announcement, delete_announcement } from "../controllers/Announcement.controllers.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public auth routes
router.post("/signup", create_account);
router.post("/signin", signin);
router.post("/signupadmin", create_account_admin);
router.post("/signinadmin", signin_admin);

// Public read routes
router.get("/getfood", get_food);
router.get("/getannounce", get_announcement);

// Student routes
router.post("/complaint", authenticate, authorize("student"), create_complaint);
router.get("/my-complaints", authenticate, authorize("student"), get_my_complaints);

// Admin routes
router.get("/getcomplaints", authenticate, authorize("admin"), get_complaints);
router.patch("/complaints/:id", authenticate, authorize("admin"), update_complaint);
router.get("/hostalstud", authenticate, authorize("admin"), get_hostalstud);

router.post("/create_food", authenticate, authorize("admin"), create_food);
router.put("/food/:id", authenticate, authorize("admin"), update_food);
router.delete("/food/:id", authenticate, authorize("admin"), delete_food);

router.post("/announce", authenticate, authorize("admin"), create_announce);
router.delete("/announce/:id", authenticate, authorize("admin"), delete_announcement);

export default router;
