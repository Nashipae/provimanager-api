import express from "express";
import { ServicesService } from "../services/services.service";

const serviceRouter = express.Router();

serviceRouter.post("/service", (req, res) => {
  ServicesService.create(req, res);
});

serviceRouter.get("/service", (req, res) => {
  ServicesService.list(req, res);
})

module.exports = serviceRouter;
