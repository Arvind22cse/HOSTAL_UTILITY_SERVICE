import Food from "../models/food.model.js";

export const create_food = async (req, res) => {
  const { foodname, mealType, time, img, description } = req.body;

  if (!foodname || !time || !img) {
    return res.status(400).json({ success: false, message: "Food name, time, and image are required" });
  }

  try {
    const food = await Food.create({ foodname, mealType, time, img, description });
    res.status(201).json({ success: true, data: food, message: "Food item added" });
  } catch (err) {
    console.error("Error creating food:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const get_food = async (req, res) => {
  try {
    const food = await Food.find().sort({ time: 1 });
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const update_food = async (req, res) => {
  const { foodname, mealType, time, img, description } = req.body;

  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { foodname, mealType, time, img, description },
      { new: true, runValidators: true }
    );
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }
    res.status(200).json({ success: true, data: food, message: "Food item updated" });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const delete_food = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }
    res.status(200).json({ success: true, message: "Food item deleted" });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
