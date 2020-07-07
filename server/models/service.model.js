import mongoose from "mongoose";

const ServiceModel = new mongoose.Schema(
  {
    name: String,
    serviceCategory: String,
    strategicGoals: []
  },
  { timestamps: true },
  {
    collection: "ServiceModel"
  }
);

export default mongoose.model("ServiceModel", ServiceModel);
