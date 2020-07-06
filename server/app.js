import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser"

import DBConnector from "./db";
import { AppConfig } from "./config";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import strategicGoalRouter from "./routes/strategic-goals";

const dbEngine = AppConfig.databaseEngine
const dbConnector = new DBConnector(dbEngine);
dbConnector.connect()
var app = express();
app.use(cors())
app.use(helmet())
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", strategicGoalRouter);

export default app;
