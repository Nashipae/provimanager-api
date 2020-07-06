import mongoose from "mongoose";
const StrategicGoalModel = new mongoose.Schema(
  {
    id: mongoose.ObjectId,
    name: String
  },
  { timestamps: true }
);

export default mongoose.model("StrategicGoal", StrategicGoalModel);
