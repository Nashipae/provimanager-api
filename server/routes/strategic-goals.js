import express from "express";
import StragicGoalService from "./../services/strategic-goals"

var router = express.Router();

/* GET users listing. */
router.post("/strategic-goal", (req, res) => {
  StragicGoalService().newStragicGoal(req, res)
});

module.exports = router;
