import bcrypt from "bcryptjs";
import Signup from "../models/signup.model.js";
import { generateToken } from "../utils/token.js";

export const create_account = async (req, res) => {
  const { name, email, password, roomno } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    const existing = await Signup.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await Signup.create({ name, email, password: hashedPassword, roomno: roomno || "" });
    const token = generateToken(user, "student");

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      data: { id: user._id, name: user.name, email: user.email, roomno: user.roomno, role: "student" },
    });
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide email and password" });
  }

  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    const token = generateToken(user, "student");
    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token,
      data: { id: user._id, name: user.name, email: user.email, roomno: user.roomno, role: "student" },
    });
  } catch (error) {
    console.error("Error in sign-in:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
