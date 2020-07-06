import StrategicGoalModel from "../models/strategic-goals";
import { checkServerError } from "./utils/error-handlers";
export default class StrategicGoalService {
  async newStrategicGoal(req, res) {
    const strategigcGoalRecord = StrategicGoalModel.create(
      { name: req.name },
      err => {
        if (checkServerError(err, res)) return;
      }
    );

    return res.status(200).json(strategigcGoalRecord)
  }
}
