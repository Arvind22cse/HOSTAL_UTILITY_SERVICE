import mongoose from "mongoose";

const Announcementschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    postedBy: { type: String, default: "Warden" },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("anounce", Announcementschema);
export default Announcement;
