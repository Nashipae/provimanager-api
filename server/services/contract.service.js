import ContractModel from "../models/contract.model";
import IncidentModel from "../models/incident.model";
import { checkServerError } from "./utils/error-handlers";
import { makeContractRecord } from "./utils/contract.util";
import { makeIncidentRecord } from "./utils/incident.util";
import { makeSupplierRecord, makeSupplierRecordFromObj } from "./utils/supplier.util";
import SupplierModel from "../models/supplier.model";
import ServiceModel from "../models/service.model";
import ProviderModel from "../models/provider.model";
import TaskModel from "../models/task.model";
import { TasksService } from "./task.service";

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
  
  req.body.task_contracts.forEach( async (task) => {
    const createdTask = await TasksService.createFromContract(res, task, contract._id);
    await ContractModel.findByIdAndUpdate(
      contract._id, {$push: {
        task_contracts: createdTask._id
      }}
    ).exec();
  });
  
  const providerSearched = await ProviderModel.findById(req.body.provider_id)
  let providerCategoria = providerSearched.category;
  if(providerCategoria == "Básico" && (serviceUpdated.serviceCategory == "Servicio Estratégico" || serviceUpdated.serviceCategory == "Servicio Táctico" || serviceUpdated.serviceCategory == "Servicio Operativo")){
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
    .populate("task_contracts")
    .populate("_service")
    .populate("incident_contracts")
    .populate("supplier_contracts").exec();
  return res.status(201).json(contracts);
};

const listById = async (req, res) => {
  const contracts =  await ContractModel.findById(req.params.id)
    .populate("task_contracts")
    .populate("_service")
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

const addLinkSupplier = async (req, res) => {
  var mongoose = require('mongoose');
  console.log(req.body.suppliers);
  let ids = [];
  req.body.suppliers.forEach(s=>{
    if(s.type == "S") ids.push(mongoose.Types.ObjectId(s._id));
  })
  var bar = new Promise((resolve, reject) => {
    req.body.suppliers.forEach(async (p, index, array)=>{
      if(p.type == "P") {
        const supplierRecord = makeSupplierRecordFromObj(p);
        const supplier = new SupplierModel(supplierRecord);
        await supplier.save(err => {
          if (checkServerError(res, err)) return;
        });
        ids.push(supplier._id);
      }
      if (index === array.length -1) resolve();
    })
  });
  
  bar.then(async () => {
    console.log(ids);
    const contractUpdated = await ContractModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          supplier_contracts: ids
        }
      }, {new: true}
    ).populate("task_contracts")
    .populate("_service")
    .populate("incident_contracts")
    .populate("supplier_contracts").exec();

    return res.status(201).json(contractUpdated);
  });

};

const listContractsByProvider = async (req, res) => {
  const contracts =  await ContractModel.find({_provider: req.params.id})
    .populate("task_contracts")
    .populate("_service")
    .populate("incident_contracts")
    .populate("supplier_contracts").exec();
  return res.status(201).json(contracts);
};

const qualifyContract = async (req, res) => {
  const contract =  await ContractModel.findByIdAndUpdate(
    req.params.id,
    {
      in_charge_points: req.body.in_charge_points,
      quality_points: req.body.quality_points,
      contract_points: req.body.contract_points,
      state: req.body.state
    }
  ).populate("_service").exec();

  if(req.body.supplier_points != undefined){
    req.body.supplier_points.forEach( async s =>{
      const supplierSearched = await SupplierModel.findById(s._id);
      console.log(contract_points);
      console.log(number_contracts);
      let contract_points = supplierSearched.contract_points;
      let number_contracts = supplierSearched.number_contracts;
      if(!number_contracts) number_contracts = 0;
      if(!contract_points) contract_points = 0;
      console.log(contract_points);
      console.log(number_contracts);
      console.log(s.contract_points);
      console.log((s.contract_points + contract_points))
      console.log((number_contracts + 1));
      const supplierUpdated = await SupplierModel.findByIdAndUpdate( 
        s._id, {
        number_contracts: number_contracts + 1,
        contract_points: (parseInt(s.contract_points) + parseInt(contract_points)) / (number_contracts + 1)
      }).exec();
    })
  }

  const contracts =  await ContractModel.find({_provider: contract._provider}).populate("_service").exec();
  let categoria = "";
  
  var contractPromise = new Promise((resolve, reject) => {
    contracts.forEach(async (c, index, array)=>{
      let serviceCategory = c._service.serviceCategory;
      console.log("Categoria de servicio: ");
      console.log(serviceCategory);
      console.log(c.state);
      if(c.state == "Activo"){
        if((categoria == "Básico"||categoria == "") && (serviceCategory == "Servicio Estratégico" || serviceCategory == "Servicio Táctico" || serviceCategory == "Servicio Operativo")){
          categoria = serviceCategory.split(" ")[1];
        }else if(categoria == "Operativo" && (serviceCategory == "Servicio Estratégico" || serviceCategory == "Servicio Táctico")){
          categoria = serviceCategory.split(" ")[1];
        }else if(categoria == "Táctico" && serviceCategory == "Servicio Estratégico"){
          categoria = serviceCategory.split(" ")[1];
        }else categoria = serviceCategory.split(" ")[1];
      }
      
      if (index === array.length -1) resolve();
    });
  })

  contractPromise.then(async () => {
    console.log("CATEGORIA NUEVA: ")
    console.log(categoria);
    const providerUpdated = await ProviderModel.findByIdAndUpdate(
      contract._provider, {category: categoria}
    ).exec();
  })
  return res.status(201).json(contract);
};

const cancelContract= async (req, res) => {
  const contract =  await ContractModel.findByIdAndUpdate(
    req.params.id,
    {
      state: "Cancelado"
    }
  ).exec();
  
  return res.status(201).json(contract);
}

export const ContractsService = {
  create: create,
  list: list,
  listById: listById,
  addIncident: addIncident,
  addSupplier: addSupplier,
  addLinkSupplier: addLinkSupplier,
  listContractsByProvider: listContractsByProvider,
  qualifyContract: qualifyContract,
  cancelContract: cancelContract
};
