import Complaint from "../models/complaint.model.js";
import Signup from "../models/signup.model.js";

export const create_complaint = async (req, res) => {
  const { roomno, category, comp } = req.body;

  if (!roomno || !comp) {
    return res.status(400).json({ success: false, message: "Room number and complaint details are required" });
  }

  try {
    const newComplaint = await Complaint.create({
      studentId: req.user.id,
      name: req.user.name,
      email: req.user.email,
      roomno,
      category: category || "other",
      comp,
      status: "pending",
    });

    res.status(201).json({ success: true, data: newComplaint, message: "Complaint submitted successfully" });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const get_complaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const get_my_complaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error("Error fetching student complaints:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const update_complaint = async (req, res) => {
  const { status, wardenComment } = req.body;

  if (!status && wardenComment === undefined) {
    return res.status(400).json({ success: false, message: "Status or comment is required" });
  }

  const validStatuses = ["pending", "in_progress", "resolved"];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  try {
    const update = {};
    if (status) {
      update.status = status;
      if (status === "resolved") update.resolvedAt = new Date();
    }
    if (wardenComment !== undefined) update.wardenComment = wardenComment;

    const complaint = await Complaint.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.status(200).json({ success: true, data: complaint, message: "Complaint updated" });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const get_hostalstud = async (req, res) => {
  try {
    const students = await Signup.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching hostel students:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
