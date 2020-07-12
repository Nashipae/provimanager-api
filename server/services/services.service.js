import ServiceModel from "../models/service.model";
import { checkServerError } from "./utils/error-handlers";
import { makeServiceRecord } from "./utils/service.util";

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

export const ServicesService = {
  create: create,
  list: list
}