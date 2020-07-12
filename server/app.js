import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import DBConnector from "./db";
import { AppConfig } from "./config";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import strategicGoalRouter from "./routes/strategic-goals.route";
import serviceRouter from "./routes/services.route";
import contractRouter from "./routes/contract.route";
import providerRouter from "./routes/provider.route";
import incidentRouter from "./routes/incident.route";
import taskRouter from "./routes/task.route";
import supplierRouter from "./routes/supplier.route";

const dbEngine = AppConfig.databaseEngine;
const dbConnector = new DBConnector(dbEngine);
dbConnector.connect();
var app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/api", strategicGoalRouter);
app.use("/api", contractRouter);
app.use("/api", serviceRouter);
app.use("/api", providerRouter);
app.use("/api", incidentRouter);
app.use("/api", taskRouter);
app.use("/api", supplierRouter);


export default app;
