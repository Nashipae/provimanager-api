import mongoose from "mongoose";
const StrategicGoalModel = new mongoose.Schema(
  {
    name: String
  },
  { timestamps: true },
  {
    collection: "StrategicGoal"
  }
);

export default mongoose.model("StrategicGoal", StrategicGoalModel);
