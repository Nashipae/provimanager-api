import StrategicGoalModel from "../models/strategic-goals";
import { checkServerError } from "./utils/error-handlers";

export const StrategicGoalService = {
  new: async (req, res) => {
    const strategicGoalRecord = Object.freeze({
      name: req.body.name
    });
    const strategicGoal = new StrategicGoalModel(strategicGoalRecord);
    await strategicGoal.save(err => {
      if (checkServerError(res, err)) return;
    });
  
    return res.status(200).json(strategicGoal);
  }
}

