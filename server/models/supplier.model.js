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
  },
  { timestamps: true },
  {
    collection: "Supplier"
  }
);

export default mongoose.model("Supplier", SupplierModel);
