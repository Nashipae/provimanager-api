import ContractModel from "../models/contract.model";
import IncidentModel from "../models/incident.model";
import { checkServerError } from "./utils/error-handlers";
import { makeContractRecord } from "./utils/contract.util";
import { makeIncidentRecord } from "./utils/incident.util";
import SupplierModel from "../models/supplier.model";
import ServiceModel from "../models/service.model";

const create = async (req, res) => {
  let contractRecord;
  try {
    contractRecord = makeContractRecord(req);
  } catch (error) {
    console.log(error);
  }
  const contract = new ContractModel(contractRecord);
  await contract.save(err => {
    if (checkServerError(res, err)) return;
  });

  const serviceUpdated = await ServiceModel.findByIdAndUpdate(
    req.body.service_id, {$push: {
      contracts: contract._id
    }}
  ).exec();

  return res.status(200).json(contract);
};

const list = async (req, res) => {
  const contracts =  await ContractModel.find()
    .populate("incident_contracts")
    .populate("supplier_contracts").exec();
  return res.status(201).json(contracts);
};

const addIncident = async (req, res) => {
  const incidentRecord = makeIncidentRecord(req);
  const incident = new IncidentModel(incidentRecord);
  await incident.save(err => {
    if (checkServerError(res, err)) return;
  });

  const contractFoundById = ContractModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        incident_contracts: incident._id
      }
    }
  ).exec();

  return res.status(201).json(contractFoundById);
};

const addSupplier = async (req, res) => {
  const supplierRecord = makeSupplierRecord(req);
  const supplier = new SupplierModel(supplierRecord);
  await supplier.save(err => {
    if (checkServerError(res, err)) return;
  });

  const contractFoundById = ContractModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        supplier_contracts: supplier._id
      }
    }
  ).exec();

  return res.status(201).json(contractFoundById);
};

export const ContractsService = {
  create: create,
  list: list,
  addIncident: addIncident,
  addSupplier: addSupplier
};
