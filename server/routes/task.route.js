import express from "express";
import { TasksService } from "../services/task.service";

const taskRouter = express.Router();

taskRouter.post("/task", (req, res) => {
    TasksService.create(req, res);
});

taskRouter.get("/task", (req, res) => {
    TasksService.list(req, res);
})

module.exports = taskRouter;
