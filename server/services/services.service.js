import ServiceModel from "../models/service.model";
import { checkServerError } from "./utils/error-handlers";
import { makeServiceRecord } from "./utils/service.util";
import ContractModel from "../models/contract.model";
import ProviderModel from "../models/provider.model";

const create = async (req, res) => {
  const serviceRecord = makeServiceRecord(req)
  const service = new ServiceModel(serviceRecord)
  await service.save(err => {
    if (checkServerError(res, err)) return;
  });
  return res.status(200).json(service)
}

const list = async (req, res) => {
  const services =  await ServiceModel.find()
    .populate("contracts").exec();
  return res.status(201).json(services);
}

const listContracts = async (req, res) => {
  var mongoose = require('mongoose');
  var id = mongoose.Types.ObjectId(req.params.id);

  const servicesStatistics = await ContractModel.aggregate([
    { "$match": { "_service" : {$in:[id]} } },
    { "$group": {
      "_id": "$_provider",
      "contract_count": { "$sum" : 1 } 
    }}
  ]).exec();

  return res.status(201).json(servicesStatistics);
}

export const ServicesService = {
  create: create,
  list: list,
  listContracts: listContracts
}