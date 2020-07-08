import express from "express";
import { StrategicGoalsService } from "../services/strategic-goals.service";

const strategicGoalRouter = express.Router();

strategicGoalRouter.post("/strategic-goal", (req, res) => {
  StrategicGoalsService.create(req, res);
});

strategicGoalRouter.get("/strategic-goal", (req, res) => {
  StrategicGoalsService.list(req,res)
})

module.exports = strategicGoalRouter;
