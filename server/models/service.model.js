import mongoose from "mongoose";

const ServiceModel = new mongoose.Schema(
  {
    name: String,
    serviceCategory: String,
    strategicGoals: []
  },
  { timestamps: true },
  {
    collection: "Service"
  }
);

export default mongoose.model("Service", ServiceModel);
