import mongoose from "mongoose";

const ServiceModel = new mongoose.Schema(
  {
    name: String,
    serviceCategory: String,
    strategicGoals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "StrategicGoal"
    }]
  },
  { timestamps: true },
  {
    collection: "ServiceModel"
  }
);

export default mongoose.model("ServiceModel", ServiceModel);
