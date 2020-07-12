import express from "express";
import { UsersService } from "../services/user.service";

const userRouter = express.Router();

userRouter.post("/", (req, res) => {
    UsersService.create(req, res);
});

userRouter.get("/", (req, res) => {
    UsersService.list(req, res);
})

module.exports = userRouter;
