import StrategicGoalModel from "../models/strategic-goals";
import { checkServerError } from "./utils/error-handlers";

export const newStrategicGoal = async (req, res) => {
  const strategicGoalRecord = Object.freeze({
    name: req.body.name
  });
  const strategicGoal = new StrategicGoalModel(strategicGoalRecord);
  strategicGoal
    .save(err => {
      if (checkServerError(err, res)) return;
    });

  return res.status(200).json(strategicGoalRecord);
};
