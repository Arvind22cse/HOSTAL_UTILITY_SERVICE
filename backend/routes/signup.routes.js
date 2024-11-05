import express from 'express';
import mongoose from "mongoose";
import Signup from '../models/signup.model.js';
import { create_account ,signin} from '../controllers/signup.controllers.js';
import { create_account_admin,signin_admin } from '../controllers/logadmin.controllers.js';
import { create_complaint } from '../controllers/complaint.controllers.js';
import { get_complaints } from '../controllers/complaint.controllers.js';
const router=express.Router();
router.post("/signup", create_account);
router.post("/signin", signin);
router.post("/signupadmin",create_account_admin);
router.post("/signinadmin",signin_admin)
router.post("/complaint",create_complaint);
router.get("/getcomplaints", get_complaints);
export default router;