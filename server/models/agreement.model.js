import mongoose from "mongoose";

const AgreementModel = new mongoose.Schema(
  {
    name: String,
    description: String,
    minimum: String
  },
  { timestamps: true },
  {
    collection: "Agreement"
  }
);

export default mongoose.model("Agreement", AgreementModel);
