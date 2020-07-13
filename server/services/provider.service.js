import ProviderModel from "../models/provider.model";
import { checkServerError } from "./utils/error-handlers";
import ContractModel from "../models/contract.model";

const create = async (req, res) => {
  const providerRecord = Object.freeze({
    contact: req.body.contact,
    company: req.body.company,
    country: req.body.country,
    address: req.body.address,
    email: req.body.email,
    telephone: req.body.telephone,
    cell: req.body.cell,
    web: req.body.web,
    ruc: req.body.ruc,
    state: req.body.state,
    provider_type: req.body.provider_type
  });
  const provider = new ProviderModel(providerRecord);
  await provider.save(err => {
    if (checkServerError(res, err)) return;
  });

  return res.status(200).json(provider);
};

const list = async (req, res) => {
  const providers = ProviderModel.find({});

  providers
    .exec()
    .then(providers => {
      res.status(200).json(providers);
    })
    .catch((err, docs) => {
      if (checkServerError(res, err)) return;
    });
  return res;
};

const listSuppliersByProvider = async (req, res) => {
  const contracts =  await ContractModel.find({_provider: req.params.id})
    .populate("supplier_contracts").exec();

  let suppliers = [];
  contracts.forEach(c => {
    c.supplier_contracts.forEach(s => {
      suppliers.push(s);
    })
  });
  return res.status(201).json(suppliers);
};


export const ProvidersService = {
  create: create,
  list: list,
  listSuppliersByProvider: listSuppliersByProvider
};
