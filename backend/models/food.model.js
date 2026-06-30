import mongoose from "mongoose";

const Foodschema = new mongoose.Schema(
  {
    foodname: { type: String, required: true },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snacks"],
      default: "lunch",
    },
    time: { type: Date, required: true },
    img: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Food = mongoose.model("food", Foodschema);
export default Food;
