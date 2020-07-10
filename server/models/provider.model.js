import mongoose from "mongoose";

const ProviderModel = new mongoose.Schema(
  {
    contact: String,
    company: String,
    country: String,
    address: String,
    email: String,
    telephone: String,
    cell: String,
    web: String,
    ruc: String,
    state: String,
    provider_type: String,
    category: String,
  },
  { timestamps: true },
  {
    collection: "Provider"
  }
);

export default mongoose.model("Provider", ProviderModel);
