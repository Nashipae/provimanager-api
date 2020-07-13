import mongoose from "mongoose";

const ContractModel = new mongoose.Schema(
  {
    name: String,
    description: String,
    contract_file: String,
    signature: String,
    state: String,
    dateStart: String,
    dateEnd: String,
    task_contracts: [],
    agreement_contracts: [],
    incident_contracts: [
      {
        type: mongoose.ObjectId,
        ref: "Incident"
      }
    ],
    supplier_contracts: [
      {
        type: mongoose.ObjectId,
        ref: "Supplier"
      }
    ],
    _service: {
      type: mongoose.ObjectId,
      ref: "Service"
    },
    percentage: Number,
    in_charge_points: Number,
    quality_points: Number,
    contract_points: Number,
    _provider: {
      type: mongoose.ObjectId,
      ref: "Provider"
    }
  },
  { timestamps: true },
  {
    collection: "Contract"
  }
);

export default mongoose.model("Contract", ContractModel);
