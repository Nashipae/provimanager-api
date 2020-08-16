import TaskModel from "../models/task.model";
import { checkServerError } from "./utils/error-handlers";
import ContractModel from "../models/contract.model";

const createFromContract = async (res, taskContract, contractId) => {
  const taskRecord = Object.freeze({
    dateLimit: taskContract.dateLimit,
    notification: taskContract.notification,
    done: taskContract.done,
    name: taskContract.name,
    _contract: contractId,
  });
  const task = new TaskModel(taskRecord);
  await task.save(err => {
    if (checkServerError(res, err)) return;
  });

  return task;
};

const updateTask = async (req, res) => {
  TaskModel.findByIdAndUpdate(
    req.params.id,
    {
      dateEnd: req.body.dateEnd,
      task_points: req.body.task_points,
      done: req.body.done,
      notification: req.body.notification,
    }
  ).exec();

  const contractUpdated = await ContractModel.findByIdAndUpdate(
    req.body.contract_id,
    {
      percentage: req.body.percentage,
      contract_points: req.body.contract_points
    },{new: true} 
  ).populate("task_contracts")
  .populate("_service")
  .populate("incident_contracts")
  .populate("supplier_contracts").exec();
  console.log("PUNTAJE CONTRATO: ");
  console.log(req.body.contract_points);
  return res.status(201).json(contractUpdated);
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
  createFromContract: createFromContract,
  list: list,
  updateTask: updateTask
};
