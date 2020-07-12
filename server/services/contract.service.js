import ContractModel from "../models/contract.model";
import IncidentModel from "../models/incident.model";
import { checkServerError } from "./utils/error-handlers";
import { makeContractRecord } from "./utils/service.util";
import { makeIncidentRecord } from "./utils/incident.util";

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
  return res.status(200).json(contract);
};

const list = (req, res) => {
  return res.status(200).json({});
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

export const ContractsService = {
  create: create,
  list: list,
  addIncident: addIncident
};
