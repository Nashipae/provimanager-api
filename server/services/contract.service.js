import ContractModel from "../models/contract.model";
import { checkServerError } from "./utils/error-handlers";
import { makeContractRecord } from "./utils/service.util";

const create = async (req, res) => {
  let contractRecord;
  try {
    contractRecord = makeContractRecord(req)
  } catch (error) {
    console.log(error)
  }
  
  const contract = new ContractModel(contractRecord)
  await contract.save(err => {
    if (checkServerError(res, err)) return;
  });
  return res.status(200).json(contract)
}

const list = (req, res) => {
  return res.status(200).json({})
}

export const ContractsService = {
  create: create,
  list: list
}