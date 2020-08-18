import express from "express";
import { UsersService } from "../services/user.service";

const userRouter = express.Router();

userRouter.post("/user", (req, res) => {
    UsersService.create(req, res);
});

userRouter.post("/users", (req, res) => {
  UsersService.createMany(req, res);
});

userRouter.get("/user", (req, res) => {
    UsersService.list(req, res);
})

userRouter.get("/user/:dni", (req, res) => {
  UsersService.listByDni(req, res);
})

userRouter.get("/login/:username/:password", (req, res) => {
  UsersService.returnUser(req, res);
})

module.exports = userRouter;
