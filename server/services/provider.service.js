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
      if(c.state == "Activo") suppliers.push(s);
    })
  });
  return res.status(201).json(suppliers);
};


const listAverageProvider = async (req, res) => {
  const contracts =  await ContractModel.find({_provider: req.params.id})
  let suma_quality = 0;
  let suma_in_charge = 0;
  let suma_contract = 0;
  contracts.forEach(c => {
    suma_quality += c.quality_points != undefined ? c.quality_points : 0;
    suma_in_charge += c.in_charge_points != undefined ? c.in_charge_points : 0;
    suma_contract += c.contract_points != undefined ? c.contract_points : 0;
  });

  let scores = {
    quality_points_avg: suma_quality/contracts.filter(c=>c.state == "Calificado").length,
    in_charge_points_avg: suma_in_charge/contracts.filter(c=>c.state == "Calificado").length,
    contract_points_avg: suma_contract/contracts.length,
  };
  return res.status(201).json(scores);
};

const listAverageProviders = async (req, res) => {
  const providers = await ProviderModel.find();
  const scoreslist = [];
  var bar = new Promise((resolve, reject) => {
    providers.forEach(async (value, index, array) => {
      const contracts = await ContractModel.find({ _provider: value._id });
      let suma_quality = 0;
      let suma_in_charge = 0;
      let suma_contract = 0;
      contracts.forEach(c => {
        suma_quality += c.quality_points != undefined ? c.quality_points : 0;
        suma_in_charge += c.in_charge_points != undefined ? c.in_charge_points : 0;
        suma_contract += c.contract_points != undefined ? c.contract_points : 0;
      });

      let scores = {
        provider_id: value._id,
        quality_points_avg: suma_quality / contracts.filter(c => c.state == "Calificado").length,
        in_charge_points_avg: suma_in_charge / contracts.filter(c => c.state == "Calificado").length,
        contract_points_avg: suma_contract / contracts.length,
      };
      if (scores.contract_points_avg != 0) scoreslist.push(scores);
      if (index === array.length -1) resolve();
    })
  });

  bar.then(() => {
    return res.status(201).json(scoreslist);
  });
  
};

const listHistoricPoints= async (req, res) => {
  const contracts =  await ContractModel.find({_provider: req.params.id})
    .populate("supplier_contracts").exec();
  let scores = [];
  contracts.forEach(c => {
    scores.push({
      state: c.state,
      in_charge_points: c.in_charge_points,
      quality_points: c.quality_points,
      contract_points: c.contract_points,
      dateStart: c.dateStart
    })
  });
  return res.status(201).json(scores);
};


export const ProvidersService = {
  create: create,
  list: list,
  listSuppliersByProvider: listSuppliersByProvider,
  listAverageProvider: listAverageProvider,
  listAverageProviders: listAverageProviders,
  listHistoricPoints: listHistoricPoints
};
