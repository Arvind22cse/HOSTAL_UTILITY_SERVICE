import bcrypt from "bcryptjs";
import AdminSignup from "../models/logadmin.models.js";
import { generateToken } from "../utils/token.js";

export const create_account_admin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  try {
    const existing = await AdminSignup.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Admin email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await AdminSignup.create({ name, email, password: hashedPassword });
    const token = generateToken(admin, "admin");

    res.status(201).json({
      success: true,
      message: "Admin account created",
      token,
      data: { id: admin._id, name: admin.name, email: admin.email, role: "admin" },
    });
  } catch (err) {
    console.error("Error creating admin account:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const signin_admin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide email and password" });
  }

  try {
    const admin = await AdminSignup.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin account not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    const token = generateToken(admin, "admin");
    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token,
      data: { id: admin._id, name: admin.name, email: admin.email, role: "admin" },
    });
  } catch (error) {
    console.error("Error in admin sign-in:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
