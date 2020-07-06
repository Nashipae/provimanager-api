import express from "express";
import { StrategicGoalService } from "../services/strategic-goals.service";

const strategicGoalRouter = express.Router();

strategicGoalRouter.post("/strategic-goal", (req, res) => {
  StrategicGoalService.create(req, res);
});

strategicGoalRouter.get("/strategic-goal", (req, res) => {
  StrategicGoalService.list(req,res)
})

module.exports = strategicGoalRouter;
