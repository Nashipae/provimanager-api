import mongoose from "mongoose";

const ServiceModel = new mongoose.Schema(
  {
    name: String,
    serviceCategory: String,
    strategicGoals: [],
    contracts: [
      {
        type: mongoose.ObjectId,
        ref: "Contract"
      }
    ],

  },
  { timestamps: true },
  {
    collection: "Service"
  }
);

export default mongoose.model("Service", ServiceModel);
