import SupplierModel from "../models/supplier.model";
import { checkServerError } from "./utils/error-handlers";

const create = async (req, res) => {
  const supplierRecord = Object.freeze({
    contact: req.body.contact,
    company: req.body.company,
    country: req.body.country,
    email: req.body.email,
    telephone: req.body.telephone,
    cell: req.body.cell,
    ruc: req.body.ruc,
    state: req.body.state,
    number_contracts: 0,
  });
  const supplier = new SupplierModel(supplierRecord);
  await supplier.save(err => {
    if (checkServerError(res, err)) return;
  });

  return res.status(200).json(supplier);
};

const update = async (req, res) => {
  const supplierUpdated =  await SupplierModel.findByIdAndUpdate(
    req.params.id,
    {
      contact: req.body.contact,
      address: req.body.address,
      email: req.body.email,
      telephone: req.body.telephone,
      cell: req.body.cell,
      web: req.body.web
    }, {new: true}
  ).exec();
  
  return res.status(201).json(supplierUpdated);
};

const list = async (req, res) => {
  const suppliers = SupplierModel.find({});

  suppliers
    .exec()
    .then(suppliers => {
      res.status(200).json(suppliers);
    })
    .catch((err, docs) => {
      if (checkServerError(res, err)) return;
    });
  return res;
};
export const SuppliersService = {
  create: create,
  update: update,
  list: list
};
