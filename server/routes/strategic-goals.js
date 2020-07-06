import express from "express";
import StragicGoalService from "./../services/strategic-goals"

export const strategicGoalRouter = express.Router();

strategicGoalRouter.post("/strategic-goal", (req, res) => {
  StragicGoalService().newStragicGoal(req, res)
});
