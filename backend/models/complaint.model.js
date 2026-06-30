import mongoose from "mongoose";

const Complaintschema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    roomno: { type: String, required: true },
    category: {
      type: String,
      enum: ["maintenance", "cleanliness", "food", "security", "other"],
      default: "other",
    },
    comp: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending",
    },
    wardenComment: { type: String, default: "" },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("complaint", Complaintschema);
export default Complaint;
