import mongoose from "mongoose";
import { AppConfig } from "../config";

mongoose.Promise = global.Promise;
mongoose.set("useUnifiedTopology", true);

export const mongoConnector = async () => {
  mongoose.set("debug", true);
  const mongoUri = AppConfig.databaseUri;
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true });
    console.log("Connection succesful!");
  } catch (err) {
    console.log("error: " + err);
  }
};
