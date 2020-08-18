import UserModel from "../models/user.model";
import { checkServerError } from "./utils/error-handlers";

const create = async (req, res) => {
  const userRecord = Object.freeze({
    role: req.body.role,
    name: req.body.name,
    last_name: req.body.last_name,
    id_doc: req.body.id_doc,
    username: req.body.username,
    password: req.body.password
  });
  const user = new UserModel(userRecord);
  await user.save(err => {
    if (checkServerError(res, err)) return;
  });

  return res.status(200).json(user);
};

const createMany = async (req, res) => {
  const strategicGoals = await UserModel.insertMany(req.body)
  .then(function(docs) {
       // do something with docs
  })
  .catch(function(err) {
      // error handling here
  });

  return res.status(200).json(strategicGoals);
};

const list = async (req, res) => {
  const users = UserModel.find({});
  users
    .exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch((err, docs) => {
      if (checkServerError(res, err)) return;
    });
  return res;
};

const listByDni = async (req, res) => {
  const user =  await UserModel.find({id_doc: req.params.dni})
  return res.status(201).json(user);
};

const returnUser = async (req, res) => {
    const user = UserModel.find({username: req.params.username, password: req.params.password});
    user
      .exec()
      .then(user => {
        res.status(200).json(user);
      })
      .catch((err, docs) => {
        if (checkServerError(res, err)) return;
      });
    return res;
  };

export const UsersService = {
  create: create,
  list: list,
  listByDni: listByDni,
  returnUser: returnUser,
  createMany: createMany
};
