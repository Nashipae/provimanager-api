import mongoose from "mongoose";
const StrategicGoal = new mongoose.Schema(
  {
    id: mongoose.ObjectId,
    name: String
  },
  { timestamps: true }
);

export default mongoose.model("StrategicGoal", StrategicGoal);
