import StrategicGoalModel from "../models/strategic-goal.model";
import { checkServerError } from "./utils/error-handlers";

const create = async (req, res) => {
  const strategicGoalRecord = Object.freeze({
    name: req.body.name
  });
  const strategicGoal = new StrategicGoalModel(strategicGoalRecord);
  await strategicGoal.save(err => {
    if (checkServerError(res, err)) return;
  });

  return res.status(200).json(strategicGoal);
};

const list = async (req, res) => {
  const strategicGoals = StrategicGoalModel.find({});

  strategicGoals
    .exec()
    .then(strategicGoals => {
      res.status(200).json(strategicGoals);
    })
    .catch((err, docs) => {
      if (checkServerError(res, err)) return;
    });
  return res;
};
export const StrategicGoaslService = {
  create: create,
  list: list
};
