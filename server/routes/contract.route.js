import express from "express";
import { ContractsService } from "../services/contract.service";

const contractRouter = express.Router();

contractRouter.post("/contract", (req, res) => {
    ContractsService.create(req, res);
});

contractRouter.get("/contract", (req, res) => {
    ContractsService.list(req, res);
})

contractRouter.get("/contract/:id", (req, res) => {
    ContractsService.listById(req, res);
})

contractRouter.get("/contract_provider/:id", (req, res) => {
    ContractsService.listContractsByProvider(req, res);
})

contractRouter.post("/contract/:id/add_incident", (req, res) => {
    ContractsService.addIncident(req, res)
})

contractRouter.post("/contract/:id/add_supplier", (req, res) => {
    ContractsService.addSupplier(req, res)
})

contractRouter.post("/contract/:id/add_supplier_link", (req, res) => {
    ContractsService.addLinkSupplier(req, res)
})

contractRouter.post("/contract/:id/update_task", (req, res) => {
    ContractsService.updateTask(req, res)
})

contractRouter.patch("/contract/:id", (req, res) => {
    ContractsService.qualifyContract(req, res)
})

module.exports = contractRouter;
