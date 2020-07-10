import mongoose from "mongoose";

const ContractModel = new mongoose.Schema(
  {
    name: String,
    description: String,
    contract_file: String,
    state: String,
    dateStart: String,
    dateEnd: String,
    task_contracts: [],
    agreement_contracts: [],
    incident_contracts: [],
    services: [],
    percentage: Number,
    in_charge_points: Number,
    quality_points: Number,
    contract_points: Number,
    supplier_points: Number
  },
  { timestamps: true },
  {
    collection: "Contract"
  }
);

export default mongoose.model("Contract", ContractModel);
