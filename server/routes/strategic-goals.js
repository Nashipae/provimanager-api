import express from "express";
import { newStrategicGoal } from "./../services/strategic-goals";

const strategicGoalRouter = express.Router();

strategicGoalRouter.post("/strategic-goal", (req, res) => {
  newStrategicGoal(req, res);
});

module.exports = strategicGoalRouter;
