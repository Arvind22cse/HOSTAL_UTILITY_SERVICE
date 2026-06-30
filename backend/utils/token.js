import jwt from "jsonwebtoken";

export const generateToken = (user, role) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};
