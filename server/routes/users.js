import express from "express";
import { UsersService } from "../services/user.service";

const userRouter = express.Router();

userRouter.post("/user", (req, res) => {
    UsersService.create(req, res);
});

userRouter.get("/user", (req, res) => {
    UsersService.list(req, res);
})

userRouter.get("/login/:user/:password", (req, res) => {
  UsersService.list(req, res);
})

module.exports = userRouter;
