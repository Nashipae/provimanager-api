import mongoose from "mongoose";

const IncidentModel = new mongoose.Schema(
  {
    description: String,
    fulfillment: Boolean,
    satisfaction: Number,
    _contract: {
      type: mongoose.ObjectId,
      ref: "Contract"
    }
  },
  { timestamps: true },
  {
    collection: "Incident"
  }
);

export default mongoose.model("Incident", IncidentModel);
