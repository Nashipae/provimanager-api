import AgreementModel from "../models/agreement.model";
import { checkServerError } from "./utils/error-handlers";

const create = async (req, res) => {
  const agreementRecord = Object.freeze({
    name: req.body.name,
    description: req.body.description
  });
  const agreement = new AgreementModel(agreementRecord);
  await agreement.save(err => {
    if (checkServerError(res, err)) return;
  });

  return res.status(200).json(agreement);
};

const list = async (req, res) => {
  const agreements = AgreementModel.find({});

  agreements
    .exec()
    .then(agreements => {
      res.status(200).json(agreements);
    })
    .catch((err, docs) => {
      if (checkServerError(res, err)) return;
    });
  return res;
};
export const AgreementsService = {
  create: create,
  list: list
};
