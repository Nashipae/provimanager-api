import IncidentModel from "../models/incident.model";
import { checkServerError } from "./utils/error-handlers";
import { makeIncidentRecord } from "./utils/incident.util"
const create = async (req, res) => {
  const incidentRecord = makeIncidentRecord(req)
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

const edit = async (req, res) => {
  const incidentUpdated = await IncidentModel.findByIdAndUpdate(
    req.params.id,
    {
      fulfillment: req.body.fulfillment,
      satisfaction: req.body.satisfaction
    }, {new: true}
  ).exec();

  return res.status(200).json(incidentUpdated);
};

export const IncidentsService = {
  create: create,
  list: list,
  edit: edit
};
