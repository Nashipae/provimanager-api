import express from "express";
import { ProvidersService } from "../services/provider.service";

const providerRouter = express.Router();

providerRouter.post("/provider", (req, res) => {
    ProvidersService.create(req, res);
});

providerRouter.get("/provider", (req, res) => {
    ProvidersService.list(req, res);
})

providerRouter.get("/provider_suppliers/:id", (req, res) => {
    ProvidersService.listSuppliersByProvider(req, res);
})

module.exports = providerRouter;
