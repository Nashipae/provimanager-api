import mongoose from "mongoose";

const SupplierModel = new mongoose.Schema(
  {
    contact: String,
    company: String,
    country: String,
    email: String,
    telephone: String,
    cell: String,
    ruc: String,
    state: String,
    contract_points: Number,
    _contract: {
      type: mongoose.ObjectId,
      ref: "Contract"
    }
  },
  { timestamps: true },
  {
    collection: "Supplier"
  }
);

export default mongoose.model("Supplier", SupplierModel);
