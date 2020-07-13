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

const createMany = async (req, res) => {
  const strategicGoals = await StrategicGoalModel.insertMany(req.body)
  .then(function(docs) {
       // do something with docs
  })
  .catch(function(err) {
      // error handling here
  });

  return res.status(200).json(strategicGoals);
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
export const StrategicGoalsService = {
  create: create,
  list: list,
  createMany: createMany
};
