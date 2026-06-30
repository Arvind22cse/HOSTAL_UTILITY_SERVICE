import Announcement from "../models/Announcement.models.js";

export const create_announce = async (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ success: false, message: "Title and message are required" });
  }

  try {
    const announcement = await Announcement.create({
      title,
      text,
      postedBy: req.user.name || "Warden",
    });
    res.status(201).json({ success: true, data: announcement, message: "Announcement posted" });
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const get_announcement = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const delete_announcement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({ success: true, message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
