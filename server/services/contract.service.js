import ContractModel from "../models/contract.model";
import IncidentModel from "../models/incident.model";
import { checkServerError } from "./utils/error-handlers";
import { makeContractRecord } from "./utils/contract.util";
import { makeIncidentRecord } from "./utils/incident.util";
import SupplierModel from "../models/supplier.model";
import ServiceModel from "../models/service.model";
import ProviderModel from "../models/provider.model";
import TaskModel from "../models/task.model";

const create = async (req, res) => {
  let contractRecord;
  try {
    contractRecord = makeContractRecord(req);
    console.log("Contract");
    console.log(contractRecord);
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

  const providerSearched = await ProviderModel.findById(req.body.provider_id)
  let providerCategoria = providerSearched.category;
  if(providerCategoria == "Básico" && (serviceUpdated.serviceCategory == "Servicio Estratégico" || serviceUpdated == "Servicio Táctico" || serviceUpdated.serviceCategory == "Servicio Operativo")){
    providerCategoria = serviceUpdated.serviceCategory.split(" ")[1];
  }else if(providerCategoria == "Operativo" && (serviceUpdated.serviceCategory == "Servicio Estratégico" || serviceUpdated.serviceCategory == "Servicio Táctico")){
    providerCategoria = serviceUpdated.serviceCategory.split(" ")[1];
  }else if(providerCategoria == "Táctico" && serviceUpdated.serviceCategory == "Servicio Estratégico"){
    providerCategoria = serviceUpdated.serviceCategory.split(" ")[1];
  }else providerCategoria = serviceUpdated.serviceCategory.split(" ")[1];

  const providerUpdated = await ProviderModel.findByIdAndUpdate(
    req.body.provider_id, {$push: {
      contracts: contract._id
    }, category: providerCategoria}
  ).exec();

  return res.status(200).json(contract);
};

const list = async (req, res) => {
  const contracts =  await ContractModel.find()
    .populate("service")
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

  return res.status(201).json(incident);
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

const listContractsByProvider = async (req, res) => {
  const contracts =  await ContractModel.find({_provider: req.params.id})
    .populate("_service")
    .populate("incident_contracts")
    .populate("supplier_contracts").exec();
  console.log(contracts)
  return res.status(201).json(contracts);
};

export const ContractsService = {
  create: create,
  list: list,
  addIncident: addIncident,
  addSupplier: addSupplier,
  listContractsByProvider: listContractsByProvider
};
