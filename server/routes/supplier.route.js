import express from "express";
import { SuppliersService } from "../services/supplier.service";

const supplierRouter = express.Router();

supplierRouter.post("/supplier", (req, res) => {
    SuppliersService.create(req, res);
});

supplierRouter.get("/supplier", (req, res) => {
    SuppliersService.list(req, res);
})

module.exports = supplierRouter;
