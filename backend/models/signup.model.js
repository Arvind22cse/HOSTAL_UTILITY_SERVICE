import mongoose from "mongoose";

const Signupschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roomno: { type: String, default: "" },
  },
  { timestamps: true }
);

const Signup = mongoose.model("Signup", Signupschema);
export default Signup;
