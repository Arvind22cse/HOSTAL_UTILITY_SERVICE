import Complaint from "../models/complaint.model.js";

export const create_complaint = async (req, res) => {
    const data = req.body;
    console.log("Received complaint data:", data); // Log the data received

    if (!data.name || !data.email || !data.roomno || !data.comp) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newdata = new Complaint(data);
    try {
        const savedComplaint = await newdata.save();
        console.log("Complaint saved:", savedComplaint); // Log saved complaint
        res.status(201).json({ success: true, data: savedComplaint });
    } catch (err) {
        console.error("Error creating complaint:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const get_complaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

