import express from "express";
import { ContractsService } from "../services/contract.service";

const contractRouter = express.Router();

contractRouter.post("/contract", (req, res) => {
    ContractsService.create(req, res);
});

contractRouter.get("/contract", (req, res) => {
    ContractsService.list(req, res);
})

module.exports = contractRouter;
