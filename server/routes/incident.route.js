import express from "express";
import { IncidentsService } from "../services/incident.service";

const incidentRouter = express.Router();

incidentRouter.post("/incident", (req, res) => {
    IncidentsService.create(req, res);
});

incidentRouter.get("/incident", (req, res) => {
    IncidentsService.list(req, res);
})

module.exports = incidentRouter;
