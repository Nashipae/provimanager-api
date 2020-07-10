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
  });
  const supplier = new SupplierModel(supplierRecord);
  await supplier.save(err => {
    if (checkServerError(res, err)) return;
  });

  return res.status(200).json(supplier);
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
  list: list
};
