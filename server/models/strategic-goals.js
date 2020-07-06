import mongoose from "mongoose";

const autoIncrement = require("mongoose-sequence")(mongoose)
const StrategicGoalModel = new mongoose.Schema(
  {
    name: String
  },
  { timestamps: true },
  {
    collection: "StrategicGoal"
  }
);

StrategicGoalModel.plugin(autoIncrement, {inc_field: 'id'});

export default mongoose.model("StrategicGoal", StrategicGoalModel);
