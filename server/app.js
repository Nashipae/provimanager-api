import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser"

import DBConnector from "./db";
import { AppConfig } from "./config";

const dbEngine = AppConfig.databaseEngine
DBConnector.connect(dbEngine);
var app = express();
app.use(cors)
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(helmet)
export default app;
