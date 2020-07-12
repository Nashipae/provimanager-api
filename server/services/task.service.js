import TaskModel from "../models/task.model";
import { checkServerError } from "./utils/error-handlers";

const create = async (req, res) => {
  const taskRecord = Object.freeze({
    name: req.body.name,
    description: req.body.description
  });
  const task = new TaskModel(taskRecord);
  await task.save(err => {
    if (checkServerError(res, err)) return;
  });

  return res.status(200).json(task);
};

const list = async (req, res) => {
  const tasks = TaskModel.find({});

  tasks
    .exec()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch((err, docs) => {
      if (checkServerError(res, err)) return;
    });
  return res;
};

export const TasksService = {
  create: create,
  list: list
};
