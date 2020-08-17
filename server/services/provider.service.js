import ProviderModel from "../models/provider.model";
import { checkServerError } from "./utils/error-handlers";
import ContractModel from "../models/contract.model";
import UserModel from "../models/user.model";

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
    provider_type: req.body.provider_type,
    _in_charge: req.body.in_charge
  });
  const provider = new ProviderModel(providerRecord);
  await provider.save(err => {
    if (checkServerError(res, err)) return;
  });

  const userUpdated = await UserModel.findByIdAndUpdate(
    req.body.in_charge,
    {
      $push: {
        _providers: provider._id
      }
    }
  ).exec();

  return res.status(200).json(provider);
};

const update = async (req, res) => {
  const providerUpdated =  await ProviderModel.findByIdAndUpdate(
    req.params.id,
    {
      contact: req.body.contact,
      country: req.body.country,
      address: req.body.address,
      email: req.body.email,
      telephone: req.body.telephone,
      cell: req.body.cell,
      web: req.body.web,
      _in_charge: req.body.in_charge
    }, {new: true}
  ).populate("_in_charge").exec();

  // const userUpdatedOld = await UserModel.findByIdAndUpdate(
  //   req.body._in_charge_old,
  //   {
  //     $pull: {
  //       _providers: provider._id
  //     }
  //   }
  // ).exec();

  const userUpdated = await UserModel.findByIdAndUpdate(
    req.body._in_charge,
    {
      $set: {
        _providers: providerUpdated._id
      }
    }
  ).exec();
  
  return res.status(201).json(providerUpdated);
};

const list = async (req, res) => {
  const providers =  await ProviderModel.find()
    .populate("_in_charge").exec();
  return res.status(201).json(providers);
};

const listProviderWithPoints = async (req, res) => {
  const providers = await ProviderModel.find().populate("contracts").exec();
  const providerList = [];
  var bar = new Promise((resolve, reject) => {
    
    providers.forEach(async (p, index, array) => {
      for (let i = 0; i < p.contracts.length; i++) {
        if(p.contracts[i].state == "Calificado") {
          providerList.push(p);
          break;
        }
      }
      if (index === array.length -1) resolve();
    })
  });

  bar.then(() => {
    return res.status(201).json(providerList);
  });
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
  var bar = new Promise((resolve, reject) => {
    contracts.forEach(async (c, index, array) => {
      suma_quality += c.quality_points != undefined ? c.quality_points : 0;
      suma_in_charge += c.in_charge_points != undefined ? c.in_charge_points : 0;
      suma_contract += c.contract_points != undefined ? c.contract_points : 0;
      if (index === array.length -1) resolve();
    });
  });

  bar.then(() => {
    console.log("SCORES");
    console.log(suma_contract);
    let scores = {
      quality_points_avg: suma_quality/contracts.filter(c=>c.state == "Calificado").length,
      in_charge_points_avg: suma_in_charge/contracts.filter(c=>c.state == "Calificado").length,
      contract_points_avg: suma_contract/contracts.filter(c=>(c.state == "Calificado" || c.state == "Activo")).length,
    };
    
    console.log(scores);
    return res.status(201).json(scores);
  });
};

const listAverageProviders = async (req, res) => {
  const providers = await ProviderModel.find();
  const scoreslist = [];
  let provCount = 0;
  var providerPromise = new Promise((resolveProvider, reject) => {
    providers.forEach(async (value, index, array) => {
      const contracts = await ContractModel.find({ _provider: value._id });
      let suma_quality = 0;
      let suma_in_charge = 0;
      let suma_contract = 0;
      var contractPromise = new Promise((resolveContract, reject) => {
        if(contracts.length !=0 ){
          contracts.forEach(async (c, i, arr) => {
            suma_quality += c.quality_points != undefined ? c.quality_points : 0;
            suma_in_charge += c.in_charge_points != undefined ? c.in_charge_points : 0;
            suma_contract += c.contract_points != undefined ? c.contract_points : 0;
            if (i === arr.length -1) resolveContract();
          });
        }else{
          resolveContract();
        }
      });

      contractPromise.then(() => {
        if(contracts.length !=0 ){
          let scores = {
            provider_id: value._id,
            provider: value.company,
            quality_points_avg: suma_quality / contracts.filter(c => c.state == "Calificado").length,
            in_charge_points_avg: suma_in_charge / contracts.filter(c => c.state == "Calificado").length,
            contract_points_avg: suma_contract / contracts.filter(c => c.state == "Calificado").length,
          };
          if (scores.contract_points_avg) scoreslist.push(scores);
        }
        provCount += 1;
        if (provCount === array.length) resolveProvider();
      });
      
    })
  });

  providerPromise.then(() => {
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

const deactivate= async (req, res) => {
  const provider =  await ProviderModel.findByIdAndUpdate(
    req.params.id,
    {
      state: "Desactivado"
    }
  ).exec();
  return res.status(201).json(provider);
}


export const ProvidersService = {
  create: create,
  update: update,
  list: list,
  listSuppliersByProvider: listSuppliersByProvider,
  listAverageProvider: listAverageProvider,
  listAverageProviders: listAverageProviders,
  listHistoricPoints: listHistoricPoints,
  deactivate: deactivate,
  listProviderWithPoints: listProviderWithPoints
};
