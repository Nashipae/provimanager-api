import IncidentModel from "../models/incident.model";
import { checkServerError } from "./utils/error-handlers";

const create = async (req, res) => {
  const incidentRecord = Object.freeze({
    name: req.body.name,
    description: req.body.description
  });
  const incident = new IncidentModel(incidentRecord);
  await incident.save(err => {
    if (checkServerError(res, err)) return;
  });

  return res.status(200).json(incident);
};

const list = async (req, res) => {
  const incidents = IncidentModel.find({});

  incidents
    .exec()
    .then(incidents => {
      res.status(200).json(incidents);
    })
    .catch((err, docs) => {
      if (checkServerError(res, err)) return;
    });
  return res;
};
export const IncidentsService = {
  create: create,
  list: list
};
