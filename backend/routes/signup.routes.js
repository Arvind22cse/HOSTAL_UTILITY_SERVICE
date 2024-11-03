import express from 'express';
import mongoose from "mongoose";
import Signup from '../models/signup.model.js';
import { create_account } from '../controllers/signup.controllers.js';
const router=express.Router();
router.post("/",create_account);
export default router;