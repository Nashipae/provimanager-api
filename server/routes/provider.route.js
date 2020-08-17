import express from "express";
import { ProvidersService } from "../services/provider.service";

const providerRouter = express.Router();

providerRouter.post("/provider", (req, res) => {
    ProvidersService.create(req, res);
});

providerRouter.put("/provider/:id", (req, res) => {
    ProvidersService.update(req, res);
});

providerRouter.put("/deactive_provider/:id", (req, res) => {
    ProvidersService.deactivate(req, res);
});

providerRouter.get("/provider", (req, res) => {
    ProvidersService.list(req, res);
})

providerRouter.get("/provider_filtered", (req, res) => {
    ProvidersService.listProviderWithPoints(req, res);
})

providerRouter.get("/provider_suppliers/:id", (req, res) => {
    ProvidersService.listSuppliersByProvider(req, res);
})

providerRouter.get("/provider_avgs/:id", (req, res) => {
    ProvidersService.listAverageProvider(req, res);
})

providerRouter.get("/provider_avgs", (req, res) => {
    ProvidersService.listAverageProviders(req, res);
})

providerRouter.get("/provider_points/:id", (req, res) => {
    ProvidersService.listHistoricPoints(req, res);
})

module.exports = providerRouter;
