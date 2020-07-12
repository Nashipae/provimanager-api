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

export const UsersService = {
  create: create,
  list: list
};
