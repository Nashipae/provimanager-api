import express from "express";
import { StrategicGoalService } from "./../services/strategic-goals";

const strategicGoalRouter = express.Router();

strategicGoalRouter.post("/strategic-goal", (req, res) => {
  StrategicGoalService.new(req, res);
});

module.exports = strategicGoalRouter;
